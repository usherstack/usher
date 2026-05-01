import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only show once per session
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("hasLoaded", "true");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-background"
        >
          <div className="relative w-32 h-32 flex items-center justify-center">
            <motion.svg
              viewBox="0 0 100 100"
              className="w-full h-full text-primary"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, ease: "linear", repeat: Infinity }}
            >
              <motion.path
                d="M 50,10 C 70,10 90,30 90,50 C 90,70 70,90 50,90 C 30,90 10,70 10,50 C 10,30 30,10 50,10 Z"
                fill="transparent"
                strokeWidth="2"
                stroke="currentColor"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <motion.path
                d="M 50,30 C 60,30 70,40 70,50 C 70,60 60,70 50,70 C 40,70 30,60 30,50 C 30,40 40,30 50,30 Z"
                fill="transparent"
                strokeWidth="1"
                stroke="hsl(var(--accent))"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0, rotate: -180 }}
                animate={{ pathLength: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              />
            </motion.svg>
            <motion.div
              className="absolute text-xs font-mono text-foreground tracking-[0.2em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              USHER
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
