import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";

/**
 * ScrollPill — a purely decorative scroll indicator that replaces the native
 * browser scrollbar. A short (~2in) pill is pinned, floating and static, to the
 * right edge of the viewport; an inner "thumb" glides up/down inside it as the
 * page scrolls.
 */
const TRACK = 192; // ~2 inches
const THUMB = 52;

export default function ScrollPill() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const y = useTransform(smooth, [0, 1], [0, TRACK - THUMB]);

  if (reduce) return null;

  return (
    <div
      data-testid="scroll-pill"
      aria-hidden="true"
      className="hidden md:block fixed right-3 top-1/2 -translate-y-1/2 z-[55] pointer-events-none"
      style={{ height: TRACK, width: 6 }}
    >
      {/* track */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: "color-mix(in srgb, var(--weha-text) 12%, transparent)" }}
      />
      {/* thumb / overlay */}
      <motion.div
        className="absolute left-0 right-0 rounded-full"
        style={{ height: THUMB, y, background: "var(--weha-pop)" }}
      />
    </div>
  );
}
