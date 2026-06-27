import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import ScrollSection from "@/components/ScrollSection";
import IntegrationStrip from "@/components/IntegrationStrip";
import Seo from "@/components/Seo";
import { ArrowRight, ArrowDown } from "lucide-react";

const snapshots = [
  {
    industry: "Real Estate Brokerage · Dubai",
    title: "WhatsApp Lead Pipeline",
    problem:
      "150+ WhatsApp inquiries a day from Bayut and Property Finder, manually routed by one admin.",
    flow: ["WhatsApp Business API", "n8n", "AI qualification", "CRM creation", "Agent routing"],
    before: ["Inquiry sits in WhatsApp", "Admin reads & copies", "Manual CRM entry", "Agent assigned hours later"],
    results: [
      ["Lead response", "4 hours → 4 minutes"],
      ["Admin time freed", "2 hours / day"],
      ["Leads lost to delay", "0"],
    ],
  },
  {
    industry: "Freight Forwarding SMB · UAE",
    title: "RFQ to Quote",
    problem:
      "Each RFQ emailed to 6+ suppliers manually, replies tracked in a spreadsheet, final quote compiled by hand.",
    flow: ["Email parser (n8n)", "Supplier API calls", "Claude quote comparison", "Auto-formatted PDF", "Sent via WhatsApp"],
    before: ["Email 6 suppliers", "Track replies in sheet", "Compile quote by hand", "Send — hours later"],
    results: [
      ["Quote turnaround", "4 hours → 11 minutes"],
      ["Supplier coverage", "6+ in parallel"],
      ["Advantage", "First-mover on bids"],
    ],
  },
  {
    industry: "Accounting Firm · Australia",
    title: "Payday Super Compliance",
    problem:
      "ATO Payday Super law (July 1, 2026) requires super paid within 7 days of payday — manual tracking is risky.",
    flow: ["Xero webhook", "Payment trigger", "SBCH replacement flow", "Client notification", "Compliance log"],
    before: ["Watch each payrun", "Manual super calc", "Hope it's within 7 days", "No audit trail"],
    results: [
      ["Compliance", "100% before deadline"],
      ["Manual steps / cycle", "0"],
      ["Audit trail", "Fully logged"],
    ],
  },
];

function FlowChain({ before, after }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="rounded-xl border border-weha-border bg-weha-bg p-6">
        <p className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "#b23b3b" }}>
          Before · manual
        </p>
        <ul className="space-y-3">
          {before.map((b, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="grid place-items-center h-6 w-6 rounded-full text-xs font-semibold shrink-0"
                style={{ background: "rgba(178,59,59,0.12)", color: "#b23b3b" }}>{i + 1}</span>
              <span className="text-weha-text">{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border p-6" style={{ borderColor: "color-mix(in srgb, var(--weha-teal) 40%, transparent)", background: "var(--weha-teal-soft)" }}>
        <p className="text-xs font-semibold tracking-widest uppercase mb-5 text-weha-teal">After · automated</p>
        <ul className="space-y-1">
          {after.map((a, i) => (
            <li key={i}>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-weha-teal shrink-0" />
                <span className="text-weha-text font-medium">{a}</span>
              </div>
              {i < after.length - 1 && (
                <span className="ml-[3px] block text-weha-teal/50"><ArrowDown size={14} /></span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <div data-testid="work-page" className="overflow-x-hidden">
      <Seo
        title="Work — real-world automation examples"
        description="See the automations WeHA has built and is building across real estate, freight forwarding, accounting, finance and more — each based on a real operational pain."
        path="/work"
      />
      <PageHero
        kicker="Work"
        title="What automation looks like in the"
        italicWord="real world."
        subtitle="These are the workflows we've solved and are solving now. Every example is based on a real operational pain in that vertical — not a hypothetical."
        formHeading="Get the AI Transformation Playbook"
        formTestid="work-lead-form"
        formSource="work"
      />

      <IntegrationStrip heading="The tools doing the heavy lifting" />

      <ScrollSection direction="left">
      <section className="section-glass relative section-solid py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-10">
          {snapshots.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 0.06}>
              <article className="weha-card p-8 md:p-12" data-testid={`work-snapshot-${i + 1}`}>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                  <div>
                    <span className="text-xs font-semibold tracking-widest uppercase text-weha-teal">{s.industry}</span>
                    <h2 className="weha-display text-3xl md:text-4xl mt-2 text-weha-text">{s.title}</h2>
                  </div>
                  <span className="weha-display text-5xl text-weha-teal/25">{String(i + 1).padStart(2, "0")}</span>
                </div>

                <p className="mt-6 text-weha-muted leading-relaxed text-lg max-w-3xl">{s.problem}</p>

                {/* pipeline */}
                <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-3">
                  {s.flow.map((node, idx) => (
                    <span key={node} className="flex items-center gap-2">
                      <span className="rounded-full border border-weha-border bg-weha-bg px-4 py-2 text-sm font-medium text-weha-text">
                        {node}
                      </span>
                      {idx < s.flow.length - 1 && <ArrowRight size={15} className="text-weha-teal" />}
                    </span>
                  ))}
                </div>

                <div className="mt-10">
                  <FlowChain before={s.before} after={s.flow} />
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-weha-border pt-8">
                  {s.results.map(([label, val]) => (
                    <div key={label}>
                      <p className="text-sm text-weha-faint">{label}</p>
                      <p className="weha-display text-2xl md:text-3xl text-weha-teal mt-1">{val}</p>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      </ScrollSection>

      <ScrollSection direction="right">
      <section className="section-glass py-16 md:py-20 bg-weha-surface border-y border-weha-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-weha-teal">Currently building for</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Mortgage Brokers (AU)", "Events & Exhibitions (UAE)", "Fintech (SG)"].map((t) => (
                <span key={t} className="rounded-full border border-weha-border px-5 py-2.5 text-weha-text font-medium">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      </ScrollSection>

      <ScrollSection direction="left">
      <CTABanner
        heading="Your workflow could be next. Start with the audit."
        sub="Tell us the manual process eating your week. We'll show you the automated version — live."
        cta="Start With the Audit"
        testid="work-cta"
      />
      </ScrollSection>
    </div>
  );
}
