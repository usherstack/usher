import { ProjectCard } from "./ProjectCard";
import { Project } from "@/hooks/useProjects";
import { motion } from "framer-motion";

interface PortfolioGridProps {
  projects: Project[];
}

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {projects.map((project) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </div>
  );
}
