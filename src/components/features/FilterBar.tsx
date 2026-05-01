import React from "react";
import { motion } from "framer-motion";
import { categoryStructure } from "@/lib/data";

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  activeSubcategory?: string;
  onSelect: (category: string, subcategory?: string) => void;
}

export function FilterBar({
  categories,
  activeCategory,
  activeSubcategory,
  onSelect,
}: FilterBarProps) {
  const subcategories = categoryStructure[activeCategory] || [];

  return (
    <div className="space-y-6">
      {/* Main Categories */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="flex flex-wrap gap-2 md:gap-4 mb-8 justify-center"
      >
        {categories.map((category, idx) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
            onClick={() => {
              onSelect(category, undefined);
            }}
            className={`relative px-5 py-2 text-sm font-medium transition-colors duration-300 rounded-full ${
              activeCategory === category
                ? "text-primary-foreground"
                : "text-foreground hover:text-primary"
            }`}
          >
            {activeCategory === category && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-primary rounded-full z-[-1]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <div className="flex items-center gap-2">
              <span>{category}</span>
              {activeCategory === category && !activeSubcategory && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-primary-foreground/20"
                >
                  ✓
                </motion.span>
              )}
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Sub-categories - Always Visible */}
      {subcategories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center px-2"
        >
          {/* "All in category" option */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.25 }}
            onClick={() => onSelect(activeCategory, undefined)}
            className={`relative px-4 py-1.5 text-xs font-medium transition-all duration-300 rounded-full border ${
              !activeSubcategory
                ? "bg-primary/10 border-primary text-foreground"
                : "border-muted-foreground text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            <div className="flex items-center gap-2">
              <span>All</span>
              {!activeSubcategory && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center px-1.5 py-0.5 text-xs rounded-full bg-primary/20 font-semibold"
                >
                  {activeCategory}
                </motion.span>
              )}
            </div>
          </motion.button>

          {subcategories.map((subcategory, idx) => (
            <motion.button
              key={subcategory}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.3 + idx * 0.04 }}
              onClick={() => onSelect(activeCategory, subcategory)}
              className={`relative px-4 py-1.5 text-xs font-medium transition-all duration-300 rounded-full border ${
                activeSubcategory === subcategory
                  ? "bg-primary/10 border-primary text-foreground"
                  : "border-muted-foreground text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{subcategory}</span>
                {activeSubcategory === subcategory && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center px-1.5 py-0.5 text-xs rounded-full bg-primary/20 font-semibold whitespace-nowrap"
                  >
                    {activeCategory}
                  </motion.span>
                )}
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
