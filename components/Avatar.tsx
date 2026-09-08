"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const Avatar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Raw pointer position relative to the avatar's center, in -1..1 range.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  // Smooth the raw values so the tilt eases rather than snapping.
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 20 });

  // Map pointer position to a subtle 3D tilt.
  const rotateX = useTransform(smoothY, [-1, 1], [8, -8]);
  const rotateY = useTransform(smoothX, [-1, 1], [-8, 8]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handlePointerMove = (e: PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Only react while the cursor is reasonably close to the photo, so it
      // doesn't tilt from mouse movement clear across the page.
      const rangeX = rect.width;
      const rangeY = rect.height;

      pointerX.set(Math.max(-1, Math.min(1, (e.clientX - centerX) / rangeX)));
      pointerY.set(Math.max(-1, Math.min(1, (e.clientY - centerY) / rangeY)));
    };

    const resetPointer = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", resetPointer);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", resetPointer);
    };
  }, [pointerX, pointerY, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="hidden xl:flex xl:max-w-none pointer-events-none select-none relative"
      style={{ perspective: 1200 }}
    >
      {/* Glowing aura behind the photo — pulses continuously */}
      <motion.div
        className="absolute inset-0 m-auto w-3/4 h-3/4 rounded-full bg-accent/30 blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }
        }
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      {/* Ring around the photo — draws itself in once on load, from 0% to
          100%, starting at the top and sweeping around. Implemented as an
          SVG stroke (pathLength animation) instead of a rotating masked
          gradient, since that's the reliable, flicker-free way to do a true
          reveal animation across both desktop and mobile browsers. */}
      <svg
        className="absolute inset-0 m-auto w-[92%] h-[92%] -rotate-90"
        viewBox="0 0 100 100"
        aria-hidden
      >
        <motion.circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={prefersReducedMotion ? undefined : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.6 },
            opacity: { duration: 0.4, delay: 0.6 },
          }}
        />
      </svg>

      {/* Soft grounded shadow beneath the photo, breathing opposite the float */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-8 rounded-full bg-black/40 blur-2xl"
        animate={
          prefersReducedMotion
            ? undefined
            : { scaleX: [1, 0.75, 1], opacity: [0.5, 0.25, 0.5] }
        }
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      {/* The photo itself: floats continuously and tilts toward the cursor */}
      <motion.div
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, -18, 0], scale: [1, 1.02, 1] }
        }
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full h-full"
      >
        <Image
          src="/avatar.png"
          alt="avatar"
          width={737}
          height={678}
          priority
          className="translate-z-0 w-full h-full"
        />
      </motion.div>
    </div>
  );
};

export default Avatar;
