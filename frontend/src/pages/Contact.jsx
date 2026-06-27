import { Mail, MessageCircle, Linkedin, Clock } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ScrollSection from "@/components/ScrollSection";
import PlaybookLeadForm from "@/components/PlaybookLeadForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const expectations = [
  "Get the full AI Transformation Playbook (28-page PDF).",
  "See 12 reference workflows we've shipped across UAE, AU and SG.",
  "Optional: a 15–30 minute AI readiness session to map your stack.",
];

const faqs = [
  ["Do I need to buy new software?", "No. We work with your existing tools — HubSpot, Xero, Google Sheets, WhatsApp, whatever you already run."],
  ["How long does a typical automation take?", "1–3 weeks. Most pilot workflows are live within a week."],
  ["What if I want changes after it's built?", "All workflows are documented and handed over. A 30-day support window is included."],
  ["Do you work outside UAE / AU / SG?", "We're focused on these three markets. Get in touch anyway — we'll be honest about fit."],
  ["How much does it cost?", "Starting from AED 3,500 / AUD 1,500 for a single workflow. We never quote before the audit."],
];

export default function Contact() {
  return (
    <div data-testid="contact-page" className="overflow-x-hidden">
      <PageHero
        kicker="Contact"
        title="Get the playbook,"
        italicWord="map your workflows."
        subtitle="Download the AI Transformation Playbook — the same diagnostic we use with paying clients — and tell us where you'd like to start."
        showForm={false}
      />

      <ScrollSection direction="left">
        <section className="section-glass relative pb-8 pt-4">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <Reveal>
              <ul className="grid gap-5 md:grid-cols-3">
                {expectations.map((x, i) => (
                  <li key={i} className="flex gap-3 text-weha-text">
                    <span className="text-weha-teal text-lg leading-none mt-0.5">✦</span>
                    <span className="leading-relaxed">{x}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      </ScrollSection>

      <ScrollSection direction="right" intensity={0.4}>
        <section className="section-glass py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 grid gap-12 lg:grid-cols-[1.3fr_0.9fr] lg:gap-16">
            <Reveal>
              <PlaybookLeadForm
                heading="Download the AI Transformation Playbook"
                testid="contact-playbook-form"
                source="contact"
              />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-8">
                <div className="space-y-4">
                  <a
                    href="https://wa.me/918180861084"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-weha-text hover:text-weha-teal transition-colors"
                    data-testid="contact-whatsapp"
                  >
                    <MessageCircle size={18} className="text-weha-teal" /> WhatsApp — +91 81808 61084
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-weha-text hover:text-weha-teal transition-colors"
                    data-testid="contact-linkedin"
                  >
                    <Linkedin size={18} className="text-weha-teal" /> LinkedIn — Director&apos;s profile
                  </a>
                  <a
                    href="mailto:hello@wehelpautomate.com"
                    className="flex items-center gap-3 text-weha-text hover:text-weha-teal transition-colors"
                    data-testid="contact-email"
                  >
                    <Mail size={18} className="text-weha-teal" /> hello@wehelpautomate.com
                  </a>
                </div>

                <div className="rounded-xl border border-weha-border bg-weha-surface p-6">
                  <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-weha-faint">
                    <Clock size={14} /> Time zones
                  </p>
                  <ul className="mt-4 space-y-2 text-weha-text">
                    <li>UAE — GST +4</li>
                    <li>Australia — AEST</li>
                    <li>Singapore — SGT +8</li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </ScrollSection>

      {/* FAQ */}
      <ScrollSection direction="left">
        <section className="section-glass py-20 md:py-28 bg-weha-surface border-t border-weha-border">
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <Reveal>
              <h2 className="weha-display text-3xl md:text-4xl text-weha-text">
                Quick answers.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <Accordion type="single" collapsible className="mt-8" data-testid="contact-faq">
                {faqs.map(([q, a], i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-weha-border">
                    <AccordionTrigger
                      className="text-left text-lg text-weha-text hover:text-weha-teal hover:no-underline"
                      data-testid={`faq-trigger-${i}`}
                    >
                      {q}
                    </AccordionTrigger>
                    <AccordionContent className="text-weha-muted text-base leading-relaxed">
                      {a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>
      </ScrollSection>
    </div>
  );
}
