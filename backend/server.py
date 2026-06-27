from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError
import httpx


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


class AuditRequestCreate(BaseModel):
    name: str
    company: str
    country: str
    industry: str
    process: str
    contact_method: str
    email: Optional[str] = None
    slot_iso_utc: Optional[str] = None  # ISO 8601 UTC timestamp of chosen slot
    timezone: Optional[str] = None      # IANA tz of user's selection, e.g. "Asia/Dubai"

class AuditRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    company: str
    country: str
    industry: str
    process: str
    contact_method: str
    email: Optional[str] = None
    slot_iso_utc: Optional[str] = None
    timezone: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# --- Booking config -----------------------------------------------------------
BUSINESS_START_HOUR = 9     # local time
BUSINESS_END_HOUR = 18      # local time (exclusive)
SLOT_MINUTES = 30
WORK_DAYS = {0, 1, 2, 3, 4}  # Mon..Fri

ALLOWED_TIMEZONES = {
    "Asia/Dubai",         # UAE
    "Australia/Sydney",   # AU
    "Asia/Singapore",     # SG
    "Asia/Kolkata",       # India
    "America/New_York",   # US
}


class Slot(BaseModel):
    label: str       # display label in local tz, e.g. "09:30"
    iso_utc: str     # canonical ISO 8601 UTC string used as the slot key
    taken: bool


class PlaybookLeadCreate(BaseModel):
    name: str
    company: str
    designation: Optional[str] = None
    email: EmailStr
    industry: Optional[str] = None
    country: Optional[str] = None
    session_interest: Optional[str] = None  # "Yes" | "Maybe" | "No"
    source: Optional[str] = None             # which page submitted


class PlaybookLead(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    company: str
    designation: Optional[str] = None
    email: str
    industry: Optional[str] = None
    country: Optional[str] = None
    session_interest: Optional[str] = None
    source: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


@api_router.get("/")
async def root():
    return {"message": "WeHA API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.get("/availability", response_model=List[Slot])
async def get_availability(
    date: str = Query(..., description="YYYY-MM-DD in the chosen timezone"),
    tz: str = Query(..., description="IANA timezone, e.g. Asia/Dubai"),
):
    if tz not in ALLOWED_TIMEZONES:
        raise HTTPException(status_code=400, detail=f"Unsupported timezone: {tz}")
    try:
        zone = ZoneInfo(tz)
    except ZoneInfoNotFoundError:
        raise HTTPException(status_code=400, detail=f"Unknown timezone: {tz}")
    try:
        y, m, d = (int(x) for x in date.split("-"))
        local_day_start = datetime(y, m, d, 0, 0, tzinfo=zone)
    except Exception:
        raise HTTPException(status_code=400, detail="Date must be YYYY-MM-DD")

    if local_day_start.weekday() not in WORK_DAYS:
        return []

    now_utc = datetime.now(timezone.utc)
    # Build local slots, convert to UTC ISO, then check Mongo for booked
    candidate_slots = []
    cur = local_day_start.replace(hour=BUSINESS_START_HOUR, minute=0)
    end = local_day_start.replace(hour=BUSINESS_END_HOUR, minute=0)
    while cur < end:
        utc_dt = cur.astimezone(timezone.utc)
        if utc_dt > now_utc + timedelta(minutes=15):  # must be in the future
            candidate_slots.append({
                "label": cur.strftime("%H:%M"),
                "iso_utc": utc_dt.isoformat().replace("+00:00", "Z"),
            })
        cur += timedelta(minutes=SLOT_MINUTES)

    if not candidate_slots:
        return []

    iso_keys = [s["iso_utc"] for s in candidate_slots]
    booked_cursor = db.audit_requests.find(
        {"slot_iso_utc": {"$in": iso_keys}}, {"_id": 0, "slot_iso_utc": 1}
    )
    booked = {doc["slot_iso_utc"] async for doc in booked_cursor}

    return [
        Slot(label=s["label"], iso_utc=s["iso_utc"], taken=(s["iso_utc"] in booked))
        for s in candidate_slots
    ]


@api_router.post("/audit-requests", response_model=AuditRequest)
async def create_audit_request(input: AuditRequestCreate):
    if not input.name.strip() or not input.process.strip():
        raise HTTPException(status_code=422, detail="Name and process description are required.")

    # If a slot was selected, validate it
    if input.slot_iso_utc:
        if input.timezone and input.timezone not in ALLOWED_TIMEZONES:
            raise HTTPException(status_code=422, detail="Unsupported timezone.")
        try:
            slot_dt = datetime.fromisoformat(input.slot_iso_utc.replace("Z", "+00:00"))
        except Exception:
            raise HTTPException(status_code=422, detail="Invalid slot_iso_utc format.")
        if slot_dt <= datetime.now(timezone.utc):
            raise HTTPException(status_code=422, detail="Selected slot is in the past.")
        # Atomically prevent double-booking
        existing = await db.audit_requests.find_one({"slot_iso_utc": input.slot_iso_utc}, {"_id": 1})
        if existing:
            raise HTTPException(status_code=409, detail="That slot was just taken. Please pick another.")

    obj = AuditRequest(**input.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.audit_requests.insert_one(doc)
    return obj

@api_router.get("/audit-requests", response_model=List[AuditRequest])
async def get_audit_requests():
    items = await db.audit_requests.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for it in items:
        if isinstance(it['created_at'], str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items


# --- Playbook lead capture (AI Transformation Playbook download form) ---------
@api_router.post("/playbook-requests", response_model=PlaybookLead)
async def create_playbook_request(input: PlaybookLeadCreate):
    if not input.name.strip() or not input.company.strip():
        raise HTTPException(status_code=422, detail="Name and company are required.")
    obj = PlaybookLead(**input.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.playbook_requests.insert_one(doc)
    return obj


@api_router.get("/playbook-requests", response_model=List[PlaybookLead])
async def get_playbook_requests():
    items = await db.playbook_requests.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items


# Include the router in the main app
# ---------------- WeHA AI (OpenRouter-powered chat assistant) ----------------
# NOTE: OpenRouter is wired with PLACEHOLDER credentials. Until a real
# OPENROUTER_API_KEY is provided, the endpoint returns a graceful demo response
# (mocked=True) so the UI is fully functional.
OPENROUTER_BASE_URL = os.environ.get("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1")
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
OPENROUTER_MODEL = os.environ.get("OPENROUTER_MODEL", "openai/gpt-4o-mini")
OPENROUTER_SITE_URL = os.environ.get("OPENROUTER_SITE_URL", "https://www.wehelpautomate.com")

# Placeholder model menu shown in the UI dropdown.
WEHA_AI_MODELS = [
    "openai/gpt-4o-mini",
    "openai/gpt-4o",
    "anthropic/claude-3.5-sonnet",
    "google/gemini-flash-1.5",
    "meta-llama/llama-3.1-70b-instruct",
]

WEHA_AI_SYSTEM_PROMPT = (
    "You are WeHA AI, the assistant for 'We Help Automate' (WeHA), a company that builds "
    "compliance-grade AI automation for SMBs across the UAE, Australia and Singapore. "
    "ONLY help with: (1) how AI and automation can be applied in the user's business, "
    "(2) which workflows are good automation candidates, and (3) how WeHA can help. "
    "If a question is clearly off-topic, briefly and politely steer the conversation back to "
    "AI and automation for business. Keep answers concise, practical and jargon-light. "
    "When relevant, suggest booking a free 60-minute AI Audit at wehelpautomate.com/contact."
)


def _openrouter_configured() -> bool:
    key = (OPENROUTER_API_KEY or "").strip()
    return bool(key) and key.lower() not in {"placeholder", "replace_me", "your_key_here"}


def _mock_reply(user_text: str) -> str:
    return (
        "Thanks for the question! (Demo mode — WeHA AI isn't connected to a live model yet.)\n\n"
        "Here's how I'd normally help: I'd look at your most repetitive, time-consuming tasks — "
        "things like lead follow-up, quoting, invoicing or document generation — and point out which "
        "are the best candidates to automate first using tools you likely already have (e.g. n8n, Make, "
        "your CRM and an LLM).\n\n"
        "To get tailored, accurate answers, connect an OpenRouter API key, or book a free 60-minute "
        "AI Audit at wehelpautomate.com/contact and a human will map your top 3 automatable workflows."
    )


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    session_id: str = Field(..., min_length=1)
    messages: List[ChatMessage]
    model: Optional[str] = None


@api_router.get("/weha-ai/models")
async def weha_ai_models():
    return {"models": WEHA_AI_MODELS, "default": OPENROUTER_MODEL}


@api_router.post("/weha-ai/chat")
async def weha_ai_chat(req: ChatRequest):
    if not req.messages:
        raise HTTPException(status_code=422, detail="messages cannot be empty")

    model = req.model if (req.model in WEHA_AI_MODELS) else OPENROUTER_MODEL
    last_user = next((m.content for m in reversed(req.messages) if m.role == "user"), "")

    mocked = False
    if not _openrouter_configured():
        reply = _mock_reply(last_user)
        mocked = True
    else:
        payload = {
            "model": model,
            "messages": [{"role": "system", "content": WEHA_AI_SYSTEM_PROMPT}]
            + [{"role": m.role, "content": m.content} for m in req.messages],
        }
        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "HTTP-Referer": OPENROUTER_SITE_URL,
            "X-Title": "WeHA AI",
        }
        try:
            async with httpx.AsyncClient(timeout=60.0) as http_client:
                resp = await http_client.post(
                    f"{OPENROUTER_BASE_URL}/chat/completions", json=payload, headers=headers
                )
                resp.raise_for_status()
                data = resp.json()
                reply = data["choices"][0]["message"]["content"]
        except Exception:  # noqa: BLE001
            logger.exception("OpenRouter request failed")
            reply = (
                "Sorry — I couldn't reach the model right now. Please try again shortly, "
                "or book a free AI Audit at wehelpautomate.com/contact."
            )
            mocked = True

    # Persist the conversation (best-effort).
    try:
        await db.weha_ai_sessions.update_one(
            {"session_id": req.session_id},
            {
                "$set": {"session_id": req.session_id, "model": model, "updated_at": datetime.now(timezone.utc).isoformat()},
                "$push": {
                    "messages": {
                        "$each": [
                            {"role": "user", "content": last_user},
                            {"role": "assistant", "content": reply},
                        ]
                    }
                },
            },
            upsert=True,
        )
    except Exception:  # noqa: BLE001
        logger.exception("Failed to persist weha_ai session")

    return {"reply": reply, "model": model, "mocked": mocked}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
