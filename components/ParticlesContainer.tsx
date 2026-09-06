"use client";

import Particles, { useParticlesProvider } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";

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

const ParticlesContainer = () => {
  // The engine is initialized once at the app root (see layout.tsx) so that
  // navigating between pages never re-triggers initialization — doing that
  // inside a component that mounts/unmounts on every page visit is what
  // caused crashes that froze the rest of the page's animations.
  const { loaded } = useParticlesProvider();

  if (!loaded) return null;

  return (
    <Particles
      className="w-full h-full absolute translate-z-0 pointer-events-none"
      id="tsparticles"
      options={particlesOptions}
    />
  );
};

export default ParticlesContainer;
