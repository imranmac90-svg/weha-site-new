import { useState } from "react";
import { ArrowRight, Mail, MessageCircle, Linkedin, Clock, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ScrollSection from "@/components/ScrollSection";
import { submitAuditRequest } from "@/lib/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const industries = [
  "Real Estate",
  "Freight Forwarding",
  "Accounting",
  "Mortgage & Finance",
  "Events & Exhibitions",
  "Fintech",
  "Other",
];

const faqs = [
  ["Do I need to buy new software?", "No. We work with your existing tools — HubSpot, Xero, Google Sheets, WhatsApp, whatever you already run."],
  ["How long does a typical automation take?", "1–3 weeks. Most pilot workflows are live within a week."],
  ["What if I want changes after it's built?", "All workflows are documented and handed over. A 30-day support window is included."],
  ["Do you work outside UAE / AU / SG?", "We're focused on these three markets. Get in touch anyway — we'll be honest about fit."],
  ["How much does it cost?", "Starting from AED 3,500 / AUD 1,500 for a single workflow. We never quote before the audit."],
];

const initial = {
  name: "",
  company: "",
  country: "UAE",
  industry: "Real Estate",
  process: "",
  contact_method: "WhatsApp",
  email: "",
};

// Office address / map coordinates
const OFFICE = {
  address: "A 401 Marvel Isola Undri, Pune - 411 060",
  email: "hi@wehelpautomate.com",
  phone: "+91 79722 95436",
  coords: { lat: 18.464100, lng: 73.914443 },
};
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${OFFICE.coords.lat},${OFFICE.coords.lng}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.company.trim() || !form.process.trim()) {
      toast.error("Please add your name, company, and the process you'd like to fix.");
      return;
    }
    setSubmitting(true);
    try {
      await submitAuditRequest(form);
      setDone(true);
      toast.success("Request received — we'll reply within 24 hours.");
      setForm(initial);
    } catch (err) {
      toast.error("Something went wrong. Please email hi@wehelpautomate.com");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="contact-page" className="overflow-x-hidden">
      <PageHero
        kicker="Contact"
        title="Let's find your"
        italicWord="first automation."
        subtitle="Book a free 60-minute AI Audit. We'll map your top 3 manual workflows and show you what one automation would look like — live, for your specific business."
        showForm={false}
      />

      <ScrollSection direction="right" intensity={0.4}>
        <section className="section-glass py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 grid gap-12 lg:grid-cols-[1.3fr_0.9fr] lg:gap-16">
            {/* FORM */}
            <Reveal>
              <div className="weha-card p-8 md:p-10">
                {done ? (
                  <div data-testid="contact-success" className="py-10">
                    <span className="text-xs font-semibold tracking-widest uppercase text-weha-teal">Received</span>
                    <h2 className="weha-display text-3xl md:text-4xl mt-3 text-weha-text">Thanks — your audit request is in.</h2>
                    <p className="mt-4 text-weha-muted leading-relaxed">
                      We respond within 24 hours. No sales scripts. No pitch decks. Just a
                      conversation about your workflow.
                    </p>
                    <button onClick={() => setDone(false)} className="btn-ghost mt-6" data-testid="contact-reset">
                      Send another request <ArrowRight size={15} />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} data-testid="audit-form" className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="weha-label" htmlFor="name">Name</label>
                        <input id="name" className="weha-input" value={form.name} onChange={update("name")} placeholder="Your name" data-testid="input-name" />
                      </div>
                      <div>
                        <label className="weha-label" htmlFor="company">Company name</label>
                        <input id="company" className="weha-input" value={form.company} onChange={update("company")} placeholder="Company" data-testid="input-company" />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="weha-label" htmlFor="country">Country</label>
                        <select id="country" className="weha-input" value={form.country} onChange={update("country")} data-testid="select-country">
                          <option>UAE</option>
                          <option>Australia</option>
                          <option>Singapore</option>
                          <option>India</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="weha-label" htmlFor="industry">Industry / Vertical</label>
                        <select id="industry" className="weha-input" value={form.industry} onChange={update("industry")} data-testid="select-industry">
                          {industries.map((i) => <option key={i}>{i}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="weha-label" htmlFor="email">Email</label>
                      <input id="email" type="email" className="weha-input" value={form.email} onChange={update("email")} placeholder="you@company.com" data-testid="input-email" />
                    </div>

                    <div>
                      <label className="weha-label" htmlFor="process">The manual process you want to fix</label>
                      <textarea id="process" rows={4} className="weha-input resize-none" value={form.process} onChange={update("process")} placeholder="e.g. We copy Bayut leads into a spreadsheet every morning…" data-testid="input-process" />
                    </div>

                    <div>
                      <label className="weha-label" htmlFor="contact_method">Preferred contact method</label>
                      <select id="contact_method" className="weha-input" value={form.contact_method} onChange={update("contact_method")} data-testid="select-contact-method">
                        <option>WhatsApp</option>
                        <option>Email</option>
                        <option>LinkedIn</option>
                      </select>
                    </div>

                    <button type="submit" disabled={submitting} className="btn-teal w-full justify-center disabled:opacity-60" data-testid="submit-audit">
                      {submitting ? "Sending…" : "Request My Free Audit"} <ArrowRight size={16} />
                    </button>

                    <p className="text-sm text-weha-muted leading-relaxed pt-1">
                      We respond within 24 hours. No sales scripts. No pitch decks. Just a
                      conversation about your workflow.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>

            {/* RIGHT COLUMN */}
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
                    href={`mailto:${OFFICE.email}`}
                    className="flex items-center gap-3 text-weha-text hover:text-weha-teal transition-colors"
                    data-testid="contact-email"
                  >
                    <Mail size={18} className="text-weha-teal" /> {OFFICE.email}
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
                    <li>India — IST +5:30</li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </ScrollSection>

      {/* OFFICE INFO STRIP — Address · Email · Phone */}
      <ScrollSection direction="left">
        <section className="section-glass py-16 md:py-20" data-testid="office-strip">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <Reveal>
              <div className="text-center mb-10">
                <span className="text-xs font-semibold tracking-[0.22em] uppercase text-weha-teal">
                  Find us
                </span>
                <h2 className="weha-display text-3xl md:text-4xl mt-3 text-weha-text">
                  Or drop by the office.
                </h2>
              </div>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              <Reveal>
                <div
                  className="weha-card h-full p-7 flex flex-col gap-3"
                  data-testid="office-address"
                >
                  <span className="h-10 w-10 grid place-items-center rounded-lg bg-weha-teal/12 text-weha-teal">
                    <MapPin size={18} />
                  </span>
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-weha-faint">
                    Office Address
                  </p>
                  <p className="text-weha-text leading-relaxed">{OFFICE.address}.</p>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div
                  className="weha-card h-full p-7 flex flex-col gap-3"
                  data-testid="office-email"
                >
                  <span className="h-10 w-10 grid place-items-center rounded-lg bg-weha-teal/12 text-weha-teal">
                    <Mail size={18} />
                  </span>
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-weha-faint">
                    Contact Email
                  </p>
                  <a
                    href={`mailto:${OFFICE.email}`}
                    className="text-weha-text hover:text-weha-teal transition-colors leading-relaxed"
                  >
                    {OFFICE.email}
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div
                  className="weha-card h-full p-7 flex flex-col gap-3"
                  data-testid="office-phone"
                >
                  <span className="h-10 w-10 grid place-items-center rounded-lg bg-weha-teal/12 text-weha-teal">
                    <Phone size={18} />
                  </span>
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-weha-faint">
                    Contact Number
                  </p>
                  <a
                    href={`tel:${OFFICE.phone.replace(/\s/g, "")}`}
                    className="text-weha-text hover:text-weha-teal transition-colors leading-relaxed"
                  >
                    {OFFICE.phone}
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </ScrollSection>

      {/* FULL-WIDTH MAP */}
      <section
        className="relative w-full border-y border-weha-border"
        data-testid="office-map"
        aria-label="Office location on map"
      >
        <iframe
          title="WeHA Office, Pune"
          src={MAP_EMBED_SRC}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block w-full h-[420px] md:h-[480px] border-0"
          allowFullScreen
        />
      </section>

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
