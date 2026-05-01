import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import type { Project } from "@/hooks/useProjects";
import { ArrowUpRight, Eye } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export const ProjectCard = React.memo(function ProjectCard({
  project,
  featured = false,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.35 }}
      className={`group relative overflow-hidden rounded-2xl glass-card border border-border/40 ${
        featured
          ? "aspect-[16/9] md:col-span-2"
          : "aspect-[4/3] md:aspect-square lg:aspect-[4/3]"
      }`}
    >
      {/* Image */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-background/20 mix-blend-overlay z-10" />
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          width="400"
          height="300"
        />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 z-20" />

      {/* Content */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full backdrop-blur-md border border-primary/20">
            {project.category}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {project.description}
        </p>

        {/* Action Buttons - appear on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/40 backdrop-blur-sm gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-primary/20 border border-white/20 hover:border-primary/50 flex items-center justify-center backdrop-blur-md transition-all hover:scale-110"
              title="Live Preview"
            >
              <Eye className="w-5 h-5 text-white" />
            </a>
          )}
          <Link href={`/portfolio/${project.id}`}>
            <div className="w-12 h-12 rounded-full bg-white/10 hover:bg-accent/20 border border-white/20 hover:border-accent/50 flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 cursor-pointer">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
});
