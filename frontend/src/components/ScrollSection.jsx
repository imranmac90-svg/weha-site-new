import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * ScrollSection — wraps a page section with a scroll-linked
 * 3D slide-in effect. Sections shift in from left or right,
 * rotateY slightly for depth, fade in/out, and scale.
 *
 * Props:
 *   direction: "left" | "right"  (which side the section enters from)
 *   intensity: 0..1               (0 = subtle, 1 = bold). Default 0.6.
 *   className: passthrough
 */
export default function ScrollSection({
  children,
  direction = "left",
  intensity = 0.45,
  className = "",
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // Settle the section in its straight position over more of its visible life
    offset: ["start 0.85", "end 0.15"],
  });

  const xMul = direction === "left" ? -1 : 1;
  const xIn = 70 * intensity * xMul;       // px the section starts off-screen
  const xOut = -22 * intensity * xMul;     // small drift while leaving
  const rotIn = 10 * intensity * xMul;     // entry rotation
  const rotOut = -4 * intensity * xMul;    // exit rotation

  // Section is fully "settled" (no tilt) between ~18% and ~85% of its scroll life
  const x        = useTransform(scrollYProgress, [0, 0.18, 0.85, 1], [xIn, 0, 0, xOut]);
  const rotateY  = useTransform(scrollYProgress, [0, 0.18, 0.85, 1], [rotIn, 0, 0, rotOut]);
  const opacity  = useTransform(scrollYProgress, [0, 0.12, 0.3, 0.9, 1], [0, 0.5, 1, 1, 0.9]);
  const scale    = useTransform(scrollYProgress, [0, 0.22, 0.85, 1], [0.95, 1, 1, 0.98]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      data-testid="scroll-section"
      data-direction={direction}
      style={{
        x,
        rotateY,
        opacity,
        scale,
        transformPerspective: 1400,
        transformOrigin: direction === "left" ? "left center" : "right center",
        willChange: "transform, opacity",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
