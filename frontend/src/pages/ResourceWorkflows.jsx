import { Link } from "react-router-dom";
import { ArrowLeft, Workflow, Download } from "lucide-react";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import ScrollSection from "@/components/ScrollSection";
import Seo from "@/components/Seo";

const items = [
  { title: "WhatsApp Lead Qualifier", stack: "n8n + WhatsApp + HubSpot", desc: "Auto-qualify and route inbound WhatsApp leads into your CRM in under 60 seconds." },
  { title: "RFQ → Quote Generator", stack: "Make + Claude + Airtable", desc: "Turn an inbound RFQ email into a drafted quote, ready for review." },
  { title: "Invoice Chaser", stack: "n8n + Xero + Email", desc: "Detect overdue invoices and send polite, escalating reminders automatically." },
  { title: "Meeting Notes → Action Items", stack: "Make + OpenAI + Notion", desc: "Convert call transcripts into assigned, tracked action items." },
  { title: "Onboarding Pack Builder", stack: "n8n + DocuSign + Slack", desc: "Generate and send a new-client onboarding pack the moment a deal closes." },
  { title: "Vendor Quote Tracker", stack: "Make + Airtable + Email", desc: "Track and chase vendor quotes without lifting a finger." },
];

export default function ResourceWorkflows() {
  return (
    <div data-testid="resource-workflows-page" className="overflow-x-hidden">
      <Seo
        title="Free Workflow Automations"
        description="Free, ready-to-import n8n and Make workflow automation blueprints you can plug into your own stack in minutes."
        path="/resources/workflow-automations"
      />
      <PageHero
        kicker="Resources / Workflow Automations"
        title="Free workflow"
        italicWord="automations."
        subtitle="Ready-to-import blueprints for n8n and Make — grab one, connect your tools, and ship."
        showForm={false}
      />

      <ScrollSection direction="left" settle depth={0} intensity={0.4}>
        <section className="section-glass relative section-solid py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <Reveal>
              <Link to="/resources" data-cursor="hover" className="inline-flex items-center gap-2 text-weha-muted hover:text-weha-teal transition-colors">
                <ArrowLeft size={15} /> Back to Resources
              </Link>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {items.map((it, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="weha-card h-full p-7 flex flex-col" data-testid={`workflow-${i}`}>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-weha-teal-soft text-weha-teal">
                      <Workflow size={20} />
                    </span>
                    <h3 className="weha-display text-xl mt-5 text-weha-text">{it.title}</h3>
                    <p className="mt-1 text-xs font-medium text-weha-teal">{it.stack}</p>
                    <p className="mt-3 text-weha-muted leading-relaxed flex-1">{it.desc}</p>
                    <button type="button" data-cursor="hover" className="btn-ghost mt-6 self-start" disabled>
                      <Download size={15} /> Coming soon
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollSection>

      <ScrollSection direction="right" settle depth={0.35} intensity={0.45}>
        <CTABanner heading="Need a custom automation?" sub="Book a free AI Audit and we'll build a rough version live, on your stack." testid="workflows-cta" />
      </ScrollSection>
    </div>
  );
}
