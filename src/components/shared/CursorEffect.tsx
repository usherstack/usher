import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Sprinkle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
}

export function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [sprinkles, setSprinkles] = useState<Sprinkle[]>([]);
  const [sprinkleId, setSprinkleId] = useState(0);

  useEffect(() => {
    // Only run on desktop
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    setIsVisible(true);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Create sprinkles randomly
      if (Math.random() > 0.85) {
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 20;
        const newSprinkle: Sprinkle = {
          id: sprinkleId,
          x: e.clientX,
          y: e.clientY,
          angle,
          distance,
        };
        setSprinkles((prev) => [...prev, newSprinkle]);
        setSprinkleId((prev) => prev + 1);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [sprinkleId]);

  // Clean up old sprinkles
  useEffect(() => {
    if (sprinkles.length === 0) return;

    const timer = setTimeout(() => {
      setSprinkles((prev) => prev.slice(1));
    }, 600);

    return () => clearTimeout(timer);
  }, [sprinkles]);

  if (!isVisible) return null;

  return (
    <>
      {/* Render sprinkles */}
      {sprinkles.map((sprinkle) => (
        <motion.div
          key={sprinkle.id}
          className="fixed w-1 h-1 bg-primary rounded-full pointer-events-none z-[100]"
          initial={{
            x: sprinkle.x - 2,
            y: sprinkle.y - 2,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            x: sprinkle.x + Math.cos(sprinkle.angle) * sprinkle.distance - 2,
            y: sprinkle.y + Math.sin(sprinkle.angle) * sprinkle.distance - 2,
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Main cursor glow effect */}
      <motion.div
        className="fixed top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none z-[-1]"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 50 }}
      />
    </>
  );
}
