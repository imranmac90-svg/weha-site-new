import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Sun, Moon, ArrowRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useBooking } from "@/context/BookingContext";
import Magnetic from "@/components/Magnetic";
import Logo from "@/components/Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const { theme, toggle } = useTheme();
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        open
          ? "bg-weha-bg border-b border-weha-border"
          : scrolled
          ? "backdrop-blur-xl bg-weha-bg/80 border-b border-weha-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 md:h-[72px] flex items-center justify-between">
        <Link to="/" className="text-weha-text" data-testid="header-logo-link" onClick={() => setOpen(false)}>
          <Logo animated />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              data-testid={`nav-${l.label.toLowerCase()}`}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-colors duration-200 hover:text-weha-teal ${
                  isActive ? "text-weha-teal" : "text-weha-text"
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative inline-block pb-1">
                  {l.label}
                  {isActive && (
                    <span className="absolute left-0 -bottom-[1px] h-[2px] w-full bg-weha-teal rounded-full" />
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            data-testid="theme-toggle"
            aria-label="Toggle theme"
            className="h-9 w-9 grid place-items-center rounded-full border border-weha-border text-weha-text hover:text-weha-teal hover:border-weha-teal transition-colors"
          >
            {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
          </button>

          <Magnetic strength={0.3} className="hidden sm:inline-flex">
            <Link to="/contact" className="btn-teal" data-testid="header-cta" data-cursor="hover" onClick={(e) => { e.preventDefault(); openBooking(); }}>
              Book a Free Audit <ArrowRight size={16} />
            </Link>
          </Magnetic>

          <button
            onClick={() => setOpen((v) => !v)}
            data-testid="mobile-menu-toggle"
            aria-label="Menu"
            className="md:hidden h-9 w-9 grid place-items-center rounded-full border border-weha-border text-weha-text"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile full-screen overlay */}
      <div
        data-testid="mobile-menu"
        className={`md:hidden fixed inset-0 top-16 z-40 bg-weha-bg transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 pt-10 pb-12 flex flex-col gap-2">
          {links.map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setOpen(false)}
              data-testid={`mobile-nav-${l.label.toLowerCase()}`}
              className={({ isActive }) =>
                `weha-display text-5xl py-3 border-b border-weha-border ${
                  isActive ? "text-weha-teal" : "text-weha-text"
                }`
              }
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={(e) => { e.preventDefault(); setOpen(false); openBooking(); }}
            className="btn-teal mt-8 justify-center"
            data-testid="mobile-cta"
          >
            Book a Free Audit <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </header>
  );
}
