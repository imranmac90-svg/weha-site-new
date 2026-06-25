import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const nav = [
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="border-t border-weha-border bg-weha-surface">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="text-weha-text">
              <Logo />
            </div>
            <p className="mt-5 text-weha-muted max-w-xs text-base leading-relaxed">
              Automation without compliance shortcuts.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-weha-faint mb-4">Pages</p>
            <ul className="space-y-3">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    data-testid={`footer-nav-${n.label.toLowerCase()}`}
                    className="text-weha-muted hover:text-weha-teal transition-colors"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-weha-faint mb-4">Markets</p>
            <ul className="space-y-3 text-weha-muted">
              <li>UAE · Dubai</li>
              <li>Australia</li>
              <li>Singapore</li>
            </ul>
            <a
              href="mailto:hello@wehelpautomate.com"
              className="mt-5 inline-block text-weha-text hover:text-weha-teal transition-colors"
              data-testid="footer-email"
            >
              hello@wehelpautomate.com
            </a>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-weha-border flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="text-sm text-weha-faint">© {new Date().getFullYear()} We Help Automate. All rights reserved.</p>
          <p className="text-sm text-weha-faint">UAE · Australia · Singapore</p>
        </div>
      </div>
    </footer>
  );
}
