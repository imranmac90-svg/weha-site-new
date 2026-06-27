import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Download } from "lucide-react";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import ScrollSection from "@/components/ScrollSection";
import Seo from "@/components/Seo";

const items = [
  { title: "The SMB Guide to Compliance-Grade AI Automation", desc: "Why automation without compliance shortcuts matters — and how to do it right.", read: "22 min read" },
  { title: "Automating Without Buying New Software", desc: "How to get more out of the tools you already pay for.", read: "15 min read" },
  { title: "From 4 Hours to 4 Minutes: Lead Response Playbook", desc: "A field guide to instant, automated lead qualification.", read: "18 min read" },
  { title: "Data Privacy for Automated Workflows (UAE / AU / SG)", desc: "A plain-English look at PDPL, the Privacy Act, and PDPA for automated systems.", read: "20 min read" },
];

export default function ResourceEbooks() {
  return (
    <div data-testid="resource-ebooks-page" className="overflow-x-hidden">
      <Seo
        title="Free eBooks"
        description="Free WeHA eBooks: deep-dive guides on compliance-grade AI automation for SMBs across the UAE, Australia and Singapore."
        path="/resources/ebooks"
      />
      <PageHero
        kicker="Resources / eBooks"
        title="Free"
        italicWord="eBooks."
        subtitle="Long-form guides that go deep on automation strategy, compliance and ROI."
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
                  <div className="weha-card h-full p-7 flex flex-col" data-testid={`ebook-${i}`}>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-weha-teal-soft text-weha-teal">
                      <FileText size={20} />
                    </span>
                    <h3 className="weha-display text-2xl mt-5 text-weha-text">{it.title}</h3>
                    <p className="mt-2 text-weha-muted leading-relaxed flex-1">{it.desc}</p>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-xs font-semibold tracking-widest uppercase text-weha-faint">{it.read}</span>
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
        <CTABanner heading="Have a question the eBook didn't answer?" sub="Book a free AI Audit with a human." testid="ebooks-cta" />
      </ScrollSection>
    </div>
  );
}
