// POST /api/audit-requests  — stores a lead in D1 and emails a notification.
// GET  /api/audit-requests   — returns recent leads (newest first).

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ detail: "Invalid JSON body." }, 422);
  }

  const name = (body.name || "").trim();
  const process = (body.process || "").trim();

  if (!name || !process) {
    return json({ detail: "Name and process description are required." }, 422);
  }

  const record = {
    id: crypto.randomUUID(),
    name,
    company: (body.company || "").trim(),
    country: (body.country || "").trim(),
    industry: (body.industry || "").trim(),
    process,
    contact_method: (body.contact_method || "").trim(),
    email: body.email ? String(body.email).trim() : null,
    created_at: new Date().toISOString(),
  };

  try {
    await env.DB.prepare(
      `INSERT INTO audit_requests
       (id, name, company, country, industry, process, contact_method, email, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        record.id, record.name, record.company, record.country,
        record.industry, record.process, record.contact_method,
        record.email, record.created_at
      )
      .run();
  } catch (err) {
    return json({ detail: "Could not save request.", error: String(err) }, 500);
  }

  if (env.RESEND_API_KEY && env.LEAD_TO_EMAIL && env.LEAD_FROM_EMAIL) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: env.LEAD_FROM_EMAIL,
          to: env.LEAD_TO_EMAIL,
          reply_to: record.email || undefined,
          subject: `New WeHA audit request — ${record.company || record.name}`,
          text:
            `New audit request submitted via the WeHA site:\n\n` +
            `Name:           ${record.name}\n` +
            `Company:        ${record.company}\n` +
            `Country:        ${record.country}\n` +
            `Industry:       ${record.industry}\n` +
            `Contact method: ${record.contact_method}\n` +
            `Email:          ${record.email || "—"}\n\n` +
            `Process described:\n${record.process}\n\n` +
            `Submitted: ${record.created_at}\n` +
            `Ref: ${record.id}\n`,
        }),
      });
    } catch (_) {}
  }

  return json(record, 200);
}

export async function onRequestGet({ env }) {
  try {
    const { results } = await env.DB.prepare(
      `SELECT id, name, company, country, industry, process,
              contact_method, email, created_at
       FROM audit_requests
       ORDER BY created_at DESC
       LIMIT 1000`
    ).all();
    return json(results || []);
  } catch (err) {
    return json({ detail: "Could not fetch requests.", error: String(err) }, 500);
  }
}
