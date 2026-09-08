"use client";

import { useEffect, useRef, useState } from "react";
import { tsParticles } from "@tsparticles/engine";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

const particlesOptions: ISourceOptions = {
  fullScreen: { enable: false },
  background: {
    color: {
      value: "",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      push: {
        quantity: 90,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#e68e2e",
    },
    links: {
      color: "#f5d393",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        width: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: {
        min: 1,
        max: 5,
      },
    },
  },
  detectRetina: true,
};

// Loads the tsParticles plugin set exactly once for the whole app lifetime.
// We talk to the core engine directly (skipping @tsparticles/react's
// ParticlesProvider) because that wrapper calls React's createContext() at
// module-import time, which breaks Next.js's build-time page-data collection
// when imported anywhere in the app. The core engine below is plain JS with
// no such issue, and this pattern is also naturally safe to call again if
// this component remounts when navigating back to the page.
let engineReady: Promise<void> | null = null;
const ensureEngineReady = () => {
  if (!engineReady) {
    engineReady = loadFull(tsParticles);
  }
  return engineReady;
};

const ParticlesContainer = () => {
  const [ready, setReady] = useState(false);
  const containerRef = useRef<Container | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    ensureEngineReady()
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        // Decorative background only — fail silently so the rest of the
        // page keeps working even if particles can't load.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;

    let cancelled = false;

    tsParticles
      .load({ id: "tsparticles", options: particlesOptions })
      .then((container) => {
        if (cancelled || !container || container.destroyed) return;
        containerRef.current = container;
      });

    return () => {
      cancelled = true;
      containerRef.current?.destroy();
      containerRef.current = undefined;
    };
  }, [ready]);

  return (
    <div
      id="tsparticles"
      className="w-full h-full absolute translate-z-0 pointer-events-none"
    />
  );
};

export default ParticlesContainer;
