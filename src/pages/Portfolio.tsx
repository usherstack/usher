import React, { useMemo, useState } from "react";
import { PageTransition } from "@/components/shared/PageTransition";
import { PortfolioGrid } from "@/components/features/PortfolioGrid";
import { FilterBar } from "@/components/features/FilterBar";
import { useProjects } from "@/hooks/useProjects";
import { motion } from "framer-motion";
import { Loader } from "@/components/shared/Loader";

const categories = ["All", "Web", "App", "Design", "AI", "Marketing"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubcategory, setActiveSubcategory] = useState<
    string | undefined
  >(undefined);
  const { projects, loading, error } = useProjects();

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (activeCategory !== "All" && project.category !== activeCategory) {
        return false;
      }
      if (activeSubcategory && project.subcategory !== activeSubcategory) {
        return false;
      }
      return true;
    });
  }, [projects, activeCategory, activeSubcategory]);

  const handleFilterChange = (category: string, subcategory?: string) => {
    setActiveCategory(category);
    setActiveSubcategory(subcategory);
  };

  return (
    <PageTransition>
      <div className="pt-32 pb-16 relative min-h-[40vh] flex items-center overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6">
              Our Work.
            </h1>
            <p className="text-xl text-muted-foreground">
              A showcase of technical innovation and aesthetic perfection.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-10 bg-background min-h-[50vh]">
        <div className="container mx-auto px-4 md:px-8">
          <FilterBar
            categories={categories}
            activeCategory={activeCategory}
            activeSubcategory={activeSubcategory}
            onSelect={handleFilterChange}
          />

          <motion.div
            key={`${activeCategory}-${activeSubcategory}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-12"
          >
            {loading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <Loader />
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <p className="text-red-500 mb-4">
                  Failed to load projects: {error}
                </p>
                <p className="text-muted-foreground">
                  Please make sure the backend API is running
                </p>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">
                  No projects found in this category
                </p>
              </div>
            ) : (
              <PortfolioGrid projects={filteredProjects} />
            )}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
