import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

// @ts-nocheck

interface AnimatedCounterProps {
  value: number | string;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  label,
}: AnimatedCounterProps) {
  try {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const springValue = useSpring(0, {
      stiffness: 50,
      damping: 20,
      mass: 1,
    });

    const displayValue = useTransform(springValue, (current) =>
      Math.floor(current).toLocaleString(),
    );

    useEffect(() => {
      if (isInView) {
        // For numeric values, animate the counter; for static strings (like "India"), skip animation
        if (typeof value === "number") {
          springValue.set(value);
        }
      }
    }, [isInView, value, springValue]);

    // For static strings like "India", render directly without animation
    const isNumeric = typeof value === "number";

    return (
      <div
        ref={ref}
        className="flex flex-col items-center justify-center p-6 glass-card rounded-2xl"
      >
        <div className="flex items-baseline text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-2">
          <span className="text-primary">{prefix}</span>
          {isNumeric ? (
            <motion.span>{displayValue}</motion.span>
          ) : (
            <span>{value}</span>
          )}
          <span className="text-accent">{suffix}</span>
        </div>
        <div className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </div>
      </div>
    );
  } catch (error) {
    // TODO: This is a temporary fix to prevent the app from crashing.
    // The underlying issue with the AnimatedCounter component should be investigated further.
    console.error("An error occurred in the AnimatedCounter component:", error);
    return null;
  }
}
