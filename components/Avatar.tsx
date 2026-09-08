"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Avatar = () => {
  return (
    <div className="hidden xl:flex xl:max-w-none pointer-events-none select-none relative">
      {/* Glowing aura behind the photo — pulses continuously */}
      <motion.div
        className="absolute inset-0 m-auto w-3/4 h-3/4 rounded-full bg-accent/30 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden
      />

      {/* Slowly rotating ring outline around the photo */}
      <motion.div
        className="absolute inset-0 m-auto w-[92%] h-[92%] rounded-full border-2 border-dashed border-accent/40"
        animate={{ rotate: 360 }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
        aria-hidden
      />

      {/* The photo itself, gently floating up and down forever */}
      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-full h-full"
      >
        <Image
          src="/avatar.png"
          alt="avatar"
          width={737}
          height={678}
          className="translate-z-0 w-full h-full"
        />
      </motion.div>
    </div>
  );
};

export default Avatar;
