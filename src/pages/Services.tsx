import React from "react";
import { PageTransition } from "@/components/shared/PageTransition";
import { ServiceCard } from "@/components/features/ServiceCard";
import { services } from "@/lib/data";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Services() {
  const processSteps = [
    {
      title: "Discovery",
      desc: "Deep technical analysis and requirement mapping.",
    },
    {
      title: "Architecture",
      desc: "System design, technology selection, and prototyping.",
    },
    {
      title: "Engineering",
      desc: "Agile development with rigorous quality control.",
    },
    { title: "Deployment", desc: "Seamless launch with CI/CD pipelines." },
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
              Our Expertise.
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive technical and creative services designed to elevate
              your digital presence and optimize your operations.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
                Our Engineering Process
              </h2>
              <p className="text-lg text-muted-foreground">
                A methodical approach to delivering flawless digital products.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative"
                >
                  <div className="text-5xl font-bold text-primary/10 absolute -top-4 -left-4 z-[-1]">
                    0{i + 1}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground">{step.desc}</p>

                  {i < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-4 left-full w-full h-[1px] bg-border/50 -translate-x-4" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background text-center">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold mb-8">Need a custom solution?</h2>
          <Link href="/contact">
            <Button
              size="lg"
              className="rounded-full px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Contact our architects
            </Button>
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
