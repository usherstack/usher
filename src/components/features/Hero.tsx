import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AnimatedGradient } from "../animations/AnimatedGradient";
import { TypingText } from "../animations/TypingText";
import { MagneticButton } from "../animations/MagneticButton";

export function Hero() {
  const phrases = [
    "websites.",
    "applications.",
    "brand identities.",
    "AI platforms.",
    "the future.",
  ];

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20">
      <AnimatedGradient />

      <div className="container mx-auto px-4 md:px-8 z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border/50 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-foreground tracking-wide uppercase">
              Engineering Excellence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground mb-6 leading-[1.1]"
          >
            We build <br className="md:hidden" />
            <span className="text-gradient">
              <TypingText phrases={phrases} />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed"
          >
            USHER is a premium digital agency crafting high-performance
            technical solutions with unmatched aesthetic precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Link href="/contact">
              <MagneticButton className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
                Start a Project <ArrowRight className="w-5 h-5" />
              </MagneticButton>
            </Link>

            <Link href="/portfolio">
              <MagneticButton className="px-8 py-4 rounded-full bg-transparent border border-border text-foreground font-semibold text-lg flex items-center hover:bg-muted transition-colors">
                View Our Work
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
      </motion.div>
    </section>
  );
}
