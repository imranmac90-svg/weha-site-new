import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";

const services = [
  {
    n: "Service 01",
    title: "Stop losing leads to slow response times",
    name: "Lead Capture & Qualification Automation",
    desc: "AI-powered WhatsApp and email flows that capture, qualify, and route inbound leads automatically — built for real estate brokerages, mortgage brokers, and service businesses.",
    get: ["WhatsApp bot", "Lead scoring logic", "CRM integration", "Loom walkthrough of the system"],
    built: "n8n + Claude + WhatsApp Business API + HubSpot / Airtable",
    roi: "One brokerage went from 4-hour lead response to 4-minute response. Deals stopped going cold.",
    price: "AED 3,500 / AUD 1,500 setup",
  },
  {
    n: "Service 02",
    title: "Stop being the system that connects your tools",
    name: "Workflow & Document Automation",
    desc: "Map your manual process — RFQ-to-quote, invoice-to-approval, application-to-contract — and replace it with an automated pipeline. Your tools stay. The human copying between them disappears.",
    get: ["End-to-end workflow map", "n8n / Make build", "Testing + deployment", "Full documentation"],
    built: "n8n + Make + Google Workspace + Xero / DocuSign + your existing SaaS stack",
    roi: "A freight forwarder cut their RFQ-to-quote time from 4 hours to 11 minutes.",
    price: "AED 5,000 / AUD 2,500 setup",
  },
  {
    n: "Service 03",
    title: "An AI that works your inbox while you sleep",
    name: "AI Agent Deployment",
    desc: "Custom AI agents — powered by Claude or GPT-4 — that handle repetitive decisions: responding to inquiries, triaging support tickets, filtering job applications, generating first-draft reports.",
    get: ["Custom-trained AI agent", "Inbox / Slack / WhatsApp integration", "Weekly performance report"],
    built: "Claude + n8n + Apify + your CRM / comms stack",
    roi: "An accounting firm automated 70% of client inquiry responses without a single complaint.",
    price: "AED 7,500 / AUD 3,500 setup + monthly retainer",
  },
];

const scoping = [
  "Every engagement starts with a Free AI Audit (60 min) — we map workflows before writing any code.",
  "We work with your existing tools — no forced software migrations.",
  "Every automation is documented — you own it, even if you stop working with us.",
  "No retainers without proven ROI first — pilot, prove, then expand.",
];

export default function Services() {
  return (
    <div data-testid="services-page">
      <PageHero
        kicker="Services"
        title="Three things we build. One outcome:"
        italicWord="your time back."
        subtitle="We don't sell vague 'AI transformation.' We build specific, scoped systems that solve one workflow at a time."
        formHeading="Find your first automation"
        formTestid="services-lead-form"
      />

      <section className="relative section-solid py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-8">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={(i % 2) * 0.08}>
              <article className="weha-card p-8 md:p-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]" data-testid={`service-card-${i + 1}`}>
                <div>
                  <span className="text-xs font-semibold tracking-widest uppercase text-weha-teal">{s.n}</span>
                  <h2 className="weha-display text-3xl md:text-4xl mt-3 text-weha-text leading-tight">{s.title}</h2>
                  <p className="mt-2 text-sm uppercase tracking-wider text-weha-faint">{s.name}</p>
                  <p className="mt-5 text-weha-muted leading-relaxed text-base md:text-lg">{s.desc}</p>
                  <div className="mt-7 rounded-xl border border-weha-border bg-weha-bg p-5">
                    <p className="text-weha-text leading-relaxed italic">"{s.roi}"</p>
                  </div>
                </div>
                <div className="lg:border-l lg:border-weha-border lg:pl-10">
                  <p className="weha-label">What you get</p>
                  <ul className="space-y-2.5">
                    {s.get.map((g) => (
                      <li key={g} className="flex gap-3 text-weha-text">
                        <span className="text-weha-teal mt-1.5 h-1.5 w-1.5 rounded-full bg-weha-teal shrink-0" />
                        {g}
                      </li>
                    ))}
                  </ul>
                  <p className="weha-label mt-7">Built with</p>
                  <p className="text-weha-muted leading-relaxed">{s.built}</p>
                  <p className="weha-label mt-7">Starting from</p>
                  <p className="weha-display text-2xl text-weha-text">{s.price}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28 bg-weha-surface border-y border-weha-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal>
            <h2 className="weha-display text-4xl md:text-5xl text-weha-text">How WeHA scopes projects.</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {scoping.map((s, i) => (
              <Reveal key={i} delay={(i % 2) * 0.08}>
                <div className="flex gap-5">
                  <span className="weha-display text-3xl text-weha-teal/40">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-lg text-weha-text leading-relaxed">{s}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Not sure which service fits? Start with the audit."
        sub="Sixty minutes. We map your workflows, then tell you which one is worth automating first."
        cta="Start With the Audit"
        testid="services-cta"
      />
    </div>
  );
}
