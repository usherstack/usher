import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypingTextProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export function TypingText({
  phrases,
  typingSpeed = 60,
  deletingSpeed = 40,
  pauseDuration = 3500,
  className = "",
}: TypingTextProps) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayKey, setDisplayKey] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      setText((prev) => currentPhrase.substring(0, prev.length - 1));
      timer = setTimeout(() => {
        if (text === "") {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
          setDisplayKey((prev) => prev + 1);
        }
      }, deletingSpeed);
    } else {
      setText((prev) => currentPhrase.substring(0, prev.length + 1));
      timer = setTimeout(() => {
        if (text === currentPhrase) {
          timer = setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [
    text,
    isDeleting,
    phraseIndex,
    phrases,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return (
    <div className={`inline-block relative ${className}`}>
      <motion.span
        key={displayKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="inline-block bg-gradient-to-r from-primary via-blue-400 to-purple-400 bg-clip-text text-transparent font-bold"
      >
        {text}
      </motion.span>

      {/* Enhanced cursor with animation */}
      <motion.span
        animate={{
          opacity: [1, 0.3],
          boxShadow: [
            "0 0 8px rgba(var(--primary-rgb), 0.6)",
            "0 0 16px rgba(var(--primary-rgb), 0.3)",
          ],
        }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        className="inline-block w-1.5 h-1em bg-gradient-to-b from-primary to-primary/50 ml-1 align-middle rounded-full"
      />
    </div>
  );
}
