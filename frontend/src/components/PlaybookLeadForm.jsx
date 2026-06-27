import { useState } from "react";
import { Download, BookOpen, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { submitPlaybookLead, PLAYBOOK_DOWNLOAD_URL } from "@/lib/api";

const INDUSTRIES = [
  "Real Estate",
  "Freight & Logistics",
  "Accounting & Bookkeeping",
  "Mortgage & Finance",
  "Events & Exhibitions",
  "Fintech",
  "SaaS",
  "Healthcare",
  "Manufacturing",
  "Retail & E-commerce",
  "Education",
  "Hospitality",
  "Construction",
  "Marketing Agency",
  "Professional Services",
  "Other",
];

const COUNTRIES = [
  "United Arab Emirates", "Australia", "Singapore", "India",
  "United States", "United Kingdom", "Canada", "New Zealand",
  "Saudi Arabia", "Qatar", "Other",
];

const SESSION_OPTIONS = ["Yes — book me in", "Maybe later", "No, just the playbook"];

const initial = {
  name: "",
  company: "",
  designation: "",
  email: "",
  industry: "",
  country: "",
  session_interest: "",
};

export default function PlaybookLeadForm({
  heading = "Get the AI Transformation Playbook",
  testid = "playbook-form",
  source = "unknown",
  compact = false,
}) {
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.company.trim() || !form.email.trim()) {
      toast.error("Please fill in name, company, and email.");
      return;
    }
    setSubmitting(true);
    try {
      await submitPlaybookLead({ ...form, source });
      setDone(true);
      toast.success("Playbook unlocked — download starting.");
      // Open the placeholder download in a new tab
      window.open(PLAYBOOK_DOWNLOAD_URL, "_blank", "noopener,noreferrer");
    } catch (err) {
      const msg = err?.response?.data?.detail || "Something went wrong. Email hello@wehelpautomate.com";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      data-testid={testid}
      className={`glass rounded-2xl ${compact ? "p-6" : "p-7 md:p-8"} shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] border border-weha-border bg-weha-bg/85 backdrop-blur-xl`}
    >
      {done ? (
        <div className="py-4" data-testid={`${testid}-success`}>
          <div className="inline-flex items-center gap-2 text-weha-teal">
            <CheckCircle2 size={20} />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase">Sent · Check your downloads</span>
          </div>
          <h3 className="weha-display text-3xl mt-3 text-weha-text">Your playbook is on its way.</h3>
          <p className="mt-3 text-weha-muted leading-relaxed">
            If the download didn&apos;t start,{" "}
            <a className="text-weha-teal underline" href={PLAYBOOK_DOWNLOAD_URL} target="_blank" rel="noreferrer">
              click here to retry
            </a>.
            We&apos;ll also drop a copy in your inbox shortly.
          </p>
          <button
            onClick={() => { setDone(false); setForm(initial); }}
            className="btn-ghost mt-5"
            data-testid={`${testid}-reset`}
          >
            Request another copy
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} data-testid={`${testid}-form`} className="space-y-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.2em] uppercase text-weha-teal">
              <BookOpen size={13} /> Free · 28-page PDF
            </span>
            <h3 className="weha-display text-2xl md:text-3xl mt-2 text-weha-text leading-tight">{heading}</h3>
            <p className="mt-2 text-sm text-weha-muted leading-relaxed">
              The same diagnostic we use with paying clients — playbooks, scorecards and 12 reference workflows.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="weha-label" htmlFor={`${testid}-name`}>Name</label>
              <input
                id={`${testid}-name`} className="weha-input"
                value={form.name} onChange={update("name")}
                placeholder="Your name"
                data-testid={`${testid}-name`}
              />
            </div>
            <div>
              <label className="weha-label" htmlFor={`${testid}-company`}>Company</label>
              <input
                id={`${testid}-company`} className="weha-input"
                value={form.company} onChange={update("company")}
                placeholder="Company"
                data-testid={`${testid}-company`}
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="weha-label" htmlFor={`${testid}-designation`}>Designation</label>
              <input
                id={`${testid}-designation`} className="weha-input"
                value={form.designation} onChange={update("designation")}
                placeholder="e.g. Operations Manager"
                data-testid={`${testid}-designation`}
              />
            </div>
            <div>
              <label className="weha-label" htmlFor={`${testid}-email`}>Work email</label>
              <input
                id={`${testid}-email`} type="email" className="weha-input"
                value={form.email} onChange={update("email")}
                placeholder="you@company.com"
                data-testid={`${testid}-email`}
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="weha-label" htmlFor={`${testid}-industry`}>Industry</label>
              <select
                id={`${testid}-industry`} className="weha-input"
                value={form.industry} onChange={update("industry")}
                data-testid={`${testid}-industry`}
              >
                <option value="">Select industry</option>
                {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="weha-label" htmlFor={`${testid}-country`}>Country</label>
              <select
                id={`${testid}-country`} className="weha-input"
                value={form.country} onChange={update("country")}
                data-testid={`${testid}-country`}
              >
                <option value="">Select country</option>
                {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="weha-label" htmlFor={`${testid}-session`}>
              Open to a quick 15–30 min session to check your company&apos;s AI readiness?
            </label>
            <select
              id={`${testid}-session`} className="weha-input"
              value={form.session_interest} onChange={update("session_interest")}
              data-testid={`${testid}-session`}
            >
              <option value="">Select an option</option>
              {SESSION_OPTIONS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-teal w-full justify-center disabled:opacity-60"
            data-cursor="hover"
            data-testid={`${testid}-submit`}
          >
            {submitting ? "Preparing your copy…" : "Download Playbook"} <Download size={16} />
          </button>
          <p className="text-xs text-weha-faint leading-relaxed">
            We&apos;ll never spam. Unsubscribe in one click. Your data stays in our compliance-grade stack.
          </p>
        </form>
      )}
    </div>
  );
}
