import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * ScrollProgress — a thin brand-colored bar pinned to the very top of the
 * viewport that fills as the user scrolls the page. Spring-smoothed so it
 * glides rather than tracking the wheel mechanically.
 */
export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  if (reduce) return null;

  return (
    <motion.div
      data-testid="scroll-progress"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
      style={{ scaleX, background: "var(--weha-pop)" }}
    />
  );
}
