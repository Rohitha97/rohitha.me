import { Variants } from "framer-motion";

/**
 * Spring physics configurations for "Refined Technical" design language
 * Inspired by Linear.app and high-end editorial sites
 */

// Spring configurations for different interaction types
export const springConfigs = {
  // Gentle, smooth spring for subtle movements
  gentle: { stiffness: 100, damping: 15, mass: 1 },
  // Snappy spring for responsive interactions
  snappy: { stiffness: 300, damping: 25, mass: 0.8 },
  // Bouncy spring for playful elements
  bouncy: { stiffness: 400, damping: 10, mass: 0.5 },
  // Slow, deliberate spring for premium feel
  slow: { stiffness: 50, damping: 20, mass: 1.5 },
} as const;

// Staggered reveal variants for container elements
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Child variants for staggered reveals
export const staggerChild: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      ...springConfigs.gentle,
    },
  },
};

// Hero text reveal with dramatic entrance
export const heroTextReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotateX: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      ...springConfigs.slow,
      duration: 0.8,
    },
  },
};

// Subtle float animation for hero elements
export const subtleFloat: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-4, 4, -4],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Navigation link hover variants
export const navLinkHover: Variants = {
  rest: {
    scale: 1,
    color: "var(--gray-11)",
  },
  hover: {
    scale: 1.02,
    color: "var(--gray-12)",
    transition: {
      type: "spring",
      ...springConfigs.snappy,
    },
  },
};

// Card hover with spring physics
export const cardSpringHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
  },
  hover: {
    scale: 1.02,
    y: -4,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    transition: {
      type: "spring",
      ...springConfigs.snappy,
    },
  },
};

// Page transition variants
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1.0, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    },
  },
};

// Utility function to create staggered delays
export const createStaggerDelay = (index: number, baseDelay = 0.05) => ({
  delay: index * baseDelay,
});

// Viewport options for scroll-triggered animations
export const viewportOptions = {
  once: true,
  margin: "-50px",
  amount: 0.3 as const,
};
