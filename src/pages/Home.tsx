import React from "react";
import { PageTransition } from "@/components/shared/PageTransition";
import { Hero } from "@/components/features/Hero";
import { ServiceCard } from "@/components/features/ServiceCard";
import { ProjectCard } from "@/components/features/ProjectCard";
import { TestimonialsSlider } from "@/components/animations/TestimonialsSlider";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { services, testimonials } from "@/lib/data";
import { useProjects } from "@/hooks/useProjects";
import { Loader } from "@/components/shared/Loader";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Home() {
  const { projects, loading, error } = useProjects();
  const featuredProjects = projects.slice(0, 4);

  return (
    <PageTransition>
      <Hero />

      {/* Services Section */}
      <section className="py-24 md:py-32 relative bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
                Technical Mastery. <br />
                <span className="text-muted-foreground">Creative Vision.</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                We engineer full-stack solutions that push boundaries. From
                highly concurrent backends to stunning cinematic interfaces.
              </p>
            </div>
            <Link href="/services">
              <MagneticButton className="px-6 py-3 rounded-full border border-border text-foreground hover:bg-muted transition-colors flex items-center gap-2 font-medium">
                View All Services <ChevronRight className="w-4 h-4" />
              </MagneticButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 5).map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-24 md:py-32 bg-secondary/30 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
              Featured Work
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A selection of our most ambitious engineering and design projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {loading ? (
              <div className="col-span-1 md:col-span-2 flex justify-center items-center min-h-[400px]">
                <Loader />
              </div>
            ) : error ? (
              <div className="col-span-1 md:col-span-2 text-center py-16">
                <p className="text-red-500 mb-2">Failed to load projects</p>
                <p className="text-muted-foreground text-sm">
                  Please ensure the backend API is running
                </p>
              </div>
            ) : featuredProjects.length === 0 ? (
              <div className="col-span-1 md:col-span-2 text-center py-16">
                <p className="text-muted-foreground">No projects available</p>
              </div>
            ) : (
              featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  featured={index === 0}
                />
              ))
            )}
          </div>

          <div className="mt-16 text-center">
            <Link href="/portfolio">
              <MagneticButton className="mx-auto px-8 py-4 rounded-full bg-foreground text-background font-semibold text-lg flex items-center gap-2 hover:bg-primary transition-colors">
                View Full Portfolio <ArrowRight className="w-5 h-5" />
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-[-1]" />

        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
              Client Feedback
            </h2>
          </div>
          <TestimonialsSlider testimonials={testimonials} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 bg-gradient-signature opacity-10 mix-blend-screen pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1] max-w-4xl mx-auto">
              Ready to engineer your next breakthrough?
            </h2>
            <p className="text-xl md:text-2xl text-background/70 mb-12 max-w-2xl mx-auto">
              Let's build something extraordinary together.
            </p>
            <Link href="/contact">
              <MagneticButton className="mx-auto px-10 py-5 rounded-full bg-primary text-primary-foreground font-semibold text-xl flex items-center gap-3 hover:scale-105 transition-transform shadow-xl shadow-primary/20">
                Start the Conversation <ArrowRight className="w-6 h-6" />
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
