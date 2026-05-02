import React from "react";
import { PageTransition } from "@/components/shared/PageTransition";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { Team } from "@/components/features/Team";
import { motion } from "framer-motion";
import { Target, Users, Zap, Award } from "lucide-react";

export default function About() {
  const stats = [
    { value: 150, suffix: "+", label: "Projects Delivered" },
    { value: 99, suffix: "%", label: "Client Satisfaction" },
    { value: 43, label: "Awards Won" },
    { value: "India", label: "Locations" },
  ];

  const values = [
    {
      icon: Zap,
      title: "Velocity",
      desc: "We move fast without breaking things. Rapid iteration fueled by engineering rigor.",
    },
    {
      icon: Target,
      title: "Precision",
      desc: "Pixel-perfect design meets bug-free code. We obsess over the details others ignore.",
    },
    {
      icon: Users,
      title: "Collaboration",
      desc: "We act as an extension of your team, aligned with your business goals.",
    },
    {
      icon: Award,
      title: "Excellence",
      desc: "Good enough is never enough. We strive for category-defining quality.",
    },
  ];

  return (
    <PageTransition>
      <div className="pt-32 pb-20 relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6">
              We are <span className="text-primary">engineers.</span>
              <br />
              We are <span className="text-accent">creators.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              USHER was founded on a simple premise: technical execution should
              never compromise aesthetic vision, and beautiful design must be
              backed by scalable architecture.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-20 bg-background border-y border-border/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, i) => (
              <AnimatedCounter
                key={i}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
              Core Values
            </h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide every line of code we write.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="p-8 rounded-2xl glass-card hover-glow transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {value.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <Team />
    </PageTransition>
  );
}
