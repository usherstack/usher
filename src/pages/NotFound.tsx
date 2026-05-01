import React from "react";
import { PageTransition } from "@/components/shared/PageTransition";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <PageTransition>
      <div className="pt-32 pb-20 relative min-h-screen flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-foreground mb-6">
              404
            </h1>
            <p className="text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Sorry, the page you're looking for doesn't exist.
            </p>
            <Link href="/">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Back to Home
              </motion.a>
            </Link>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
