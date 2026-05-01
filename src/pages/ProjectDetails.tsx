import React, { useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import { projects } from "@/lib/data";
import { PageTransition } from "@/components/shared/PageTransition";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Globe,
  ExternalLink,
  Code,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";

export default function ProjectDetails() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const project = projects.find((p) => p.id === id);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center pt-20">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Project Not Found
          </h1>
          <Button onClick={() => setLocation("/portfolio")}>
            Back to Portfolio
          </Button>
        </div>
      </PageTransition>
    );
  }

  // Use the project's main image plus a few generic ones for the carousel
  const galleryImages = [
    project.image,
    "/images/project1.png",
    "/images/project3.png",
    "/images/project5.png",
  ];

  return (
    <PageTransition>
      <article className="pt-24 pb-20 bg-background min-h-screen">
        <div className="container mx-auto px-4 md:px-8 mb-8">
          <Link href="/portfolio">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground mb-6 px-0 hover:bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to projects
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 bg-primary/20 text-primary font-mono text-sm rounded-full mb-4 backdrop-blur-md border border-primary/30">
              {project.category}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground mb-8">
              {project.title}
            </h1>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="w-full relative mb-12 md:mb-20 container mx-auto px-4 md:px-8">
          <div
            className="overflow-hidden rounded-3xl border border-border/50"
            ref={emblaRef}
          >
            <div className="flex touch-pan-y h-[50vh] md:h-[70vh]">
              {galleryImages.map((imgSrc, index) => (
                <div className="flex-[0_0_100%] min-w-0 relative" key={index}>
                  <img
                    src={imgSrc}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-8 right-12 flex gap-3 z-10 hidden md:flex">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-12">
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  The Challenge
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.problem}
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  Our Solution
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.solution}
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  The Result
                </h2>
                <div className="p-6 md:p-8 rounded-2xl glass-card border border-primary/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px]" />
                  <p className="text-xl font-medium text-foreground relative z-10">
                    "{project.result}"
                  </p>
                </div>
              </motion.section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="sticky top-32 p-6 rounded-2xl glass-card border border-border/50"
              >
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-foreground">
                  <Code className="w-5 h-5 text-primary" /> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-muted text-muted-foreground rounded-md text-sm font-medium border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="space-y-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2">
                        <Globe className="w-4 h-4" /> Live Website{" "}
                        <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                      </Button>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-border/50 hover:bg-muted flex items-center gap-2 text-foreground"
                      >
                        <FaGithub className="w-4 h-4" /> Source Code
                      </Button>
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </article>
    </PageTransition>
  );
}
