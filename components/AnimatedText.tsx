"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { staggerContainer, staggerChild, heroTextReveal } from "@/lib/motion";

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  variant?: "stagger" | "hero";
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
}

/**
 * Animated text component with spring physics
 * Used for staggered reveals and hero text entrances
 */
export function AnimatedText({
  children,
  className = "",
  variant = "stagger",
  as = "div",
  delay = 0,
}: AnimatedTextProps) {
  const Component = motion[as];
  const variants = variant === "hero" ? heroTextReveal : staggerChild;

  return (
    <Component
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </Component>
  );
}

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Container component for staggered child animations
 */
export function AnimatedContainer({
  children,
  className = "",
  delay = 0,
}: AnimatedContainerProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedItemProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

/**
 * Individual animated item for use within AnimatedContainer
 */
export function AnimatedItem({
  children,
  className = "",
  index = 0,
}: AnimatedItemProps) {
  return (
    <motion.div variants={staggerChild} className={className}>
      {children}
    </motion.div>
  );
}

export { staggerContainer, staggerChild };
