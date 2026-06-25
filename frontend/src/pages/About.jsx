import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";

const ABOUT_IMG = "https://static.prod-images.emergentagent.com/jobs/d99f9931-db5c-4ca2-b931-d6fcff8ded90/images/258b624bb01106851a47a12dd52dbd36909965f6f8188fe7423bb709d4ef20c2.png";

const securityPoints = [
  "Client data sent to the wrong tool → a PDPL violation in the UAE, a Privacy Act breach in Australia.",
  "An AI agent making commitments your contract doesn't allow → legal liability.",
  "Automation scraping without controls → IP banned, competitive advantage lost.",
];

const values = [
  ["Specificity over vagueness", "We quote workflows, not \"efficiency gains.\""],
  ["You own your automations", "We document everything and hand it over."],
  ["Compliance is not optional", "Especially in real estate, finance, and freight."],
  ["Pilot before you commit", "Every engagement starts with one workflow, proven ROI first."],
  ["Plain English, always", "No jargon in client calls, proposals, or documentation."],
];

export default function About() {
  return (
    <div data-testid="about-page">
      <PageHero
        title="Built by someone who spent a decade keeping systems secure — and a lot of time watching founders"
        italicWord="lose theirs to manual work."
        formHeading="Talk to WeHA"
        formTestid="about-lead-form"
      />

      {/* Founder story */}
      <section className="relative section-solid py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 items-start">
          <Reveal>
            <div className="rounded-2xl overflow-hidden border border-weha-border bg-weha-surface">
              <img
                src={ABOUT_IMG}
                alt="WeHA founder illustration — security architecture meets automation"
                loading="lazy"
                className="w-full h-auto object-cover"
                data-testid="about-illustration"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-6 text-lg text-weha-text leading-relaxed">
              <p>
                The founder of WeHA spent ten years in enterprise security architecture — IAM,
                access controls, the unglamorous discipline of making sure data only ever goes
                where it's allowed to go.
              </p>
              <p className="text-weha-muted">
                The inflection point was watching small business owners — friends, colleagues,
                clients — drown in work that a $50/month n8n subscription could solve. Hours lost
                every week to copying, chasing, and re-typing.
              </p>
              <p className="text-weha-muted">
                The insight: most AI agencies are built by developers who don't understand
                compliance risk. They automate first and ask permission later. WeHA was built by
                someone who knows exactly what happens when data moves without controls.
              </p>
              <p>
                So the decision was simple — build the automation agency that SMB founders in
                regulated industries could actually trust.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why security thinking matters */}
      <section className="py-20 md:py-28 bg-weha-surface border-y border-weha-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal>
            <h2 className="weha-display text-4xl md:text-5xl text-weha-text max-w-3xl">
              Why security thinking matters for automation.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {securityPoints.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-lg text-weha-text leading-relaxed border-t-2 border-weha-teal pt-5">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-14 weha-display text-3xl md:text-4xl text-weha-text italic max-w-4xl leading-snug">
              "We build automation like we build security architecture: minimal permissions,
              documented flows, zero assumptions."
            </p>
          </Reveal>
        </div>
      </section>

      {/* Director + markets */}
      <section className="relative section-solid py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid gap-14 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-weha-teal">The public face of WeHA</span>
              <h3 className="weha-display text-3xl md:text-4xl mt-3 text-weha-text">[Director Name]</h3>
              <p className="mt-5 text-weha-muted leading-relaxed text-lg">
                [Director Name] leads client relationships and go-to-market — and makes sure every
                engagement starts with the right questions before any code is written. The
                technical founder stays behind the scenes, building.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-weha-teal">Markets</span>
              <ul className="mt-5 space-y-4 text-xl text-weha-text">
                <li>🇦🇪 UAE — Dubai</li>
                <li>🇦🇺 Australia</li>
                <li>🇸🇬 Singapore</li>
              </ul>
              <p className="mt-6 text-weha-muted">Fully remote delivery. On-site available in Dubai.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-weha-surface border-y border-weha-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Reveal>
            <h2 className="weha-display text-4xl md:text-5xl text-weha-text">What we believe.</h2>
          </Reveal>
          <div className="mt-12 divide-y divide-weha-border border-t border-weha-border">
            {values.map(([title, body], i) => (
              <Reveal key={title} delay={(i % 3) * 0.06}>
                <div className="py-7 grid gap-2 md:grid-cols-[auto_1fr] md:gap-10 items-baseline">
                  <span className="weha-display text-2xl text-weha-teal/40 w-12">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="weha-display text-2xl md:text-3xl text-weha-text">{title}</h3>
                    <p className="mt-1.5 text-weha-muted text-lg">{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Compliance-grade automation, built around your business."
        sub="Start with a free 60-minute audit. No code written until we've mapped the workflow."
        testid="about-cta"
      />
    </div>
  );
}
