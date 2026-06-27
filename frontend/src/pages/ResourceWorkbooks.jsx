import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Download } from "lucide-react";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import ScrollSection from "@/components/ScrollSection";
import Seo from "@/components/Seo";

const items = [
  { title: "The 47-Step Workflow Audit Workbook", desc: "Map every manual step in your busiest process and score it for automation potential.", pages: "12 pages" },
  { title: "Lead Response Time Tracker", desc: "A simple workbook to measure where inbound leads stall — and what it's costing you.", pages: "8 pages" },
  { title: "Document Automation Readiness Checklist", desc: "Find out which of your documents are ready to be auto-generated today.", pages: "6 pages" },
  { title: "AI Automation ROI Calculator (Printable)", desc: "Estimate hours and dollars saved before you build a single automation.", pages: "4 pages" },
];

export default function ResourceWorkbooks() {
  return (
    <div data-testid="resource-workbooks-page" className="overflow-x-hidden">
      <Seo
        title="Free Workbooks"
        description="Free printable WeHA workbooks to map, score and prioritise the manual workflows worth automating first."
        path="/resources/workbooks"
      />
      <PageHero
        kicker="Resources / Workbooks"
        title="Free"
        italicWord="workbooks."
        subtitle="Practical, printable workbooks to help you find and prioritise your highest-impact automations."
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
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {items.map((it, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="weha-card h-full p-7 flex flex-col" data-testid={`workbook-${i}`}>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-weha-teal-soft text-weha-teal">
                      <BookOpen size={20} />
                    </span>
                    <h3 className="weha-display text-2xl mt-5 text-weha-text">{it.title}</h3>
                    <p className="mt-2 text-weha-muted leading-relaxed flex-1">{it.desc}</p>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-xs font-semibold tracking-widest uppercase text-weha-faint">{it.pages}</span>
                      <button type="button" data-cursor="hover" className="btn-ghost" disabled>
                        <Download size={15} /> Coming soon
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollSection>

      <ScrollSection direction="right" settle depth={0.35} intensity={0.45}>
        <CTABanner heading="Prefer we map it with you?" sub="Book a free AI Audit — we'll fill out the workbook live, for your business." testid="workbooks-cta" />
      </ScrollSection>
    </div>
  );
}
