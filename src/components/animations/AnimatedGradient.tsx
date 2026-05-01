import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export function AnimatedGradient() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [bubblePositions, setBubblePositions] = useState<
    Record<number, { x: number; y: number }>
  >({});
  const bubblesRef = useRef<Bubble[]>([]);

  // Initialize bubbles
  useEffect(() => {
    const colors = [
      "bg-primary/50",
      "bg-accent/50",
      "bg-blue-400/50",
      "bg-purple-400/50",
      "bg-pink-400/50",
      "bg-cyan-400/50",
      "bg-indigo-400/50",
    ];

    const initialBubbles: Bubble[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 120 + 40, // 40-160px (larger)
      duration: Math.random() * 6 + 8, // 8-14s
      delay: Math.random() * 3,
      color: colors[i % colors.length],
    }));

    setBubbles(initialBubbles);
    bubblesRef.current = initialBubbles;

    // Initialize positions
    const initialPositions: Record<number, { x: number; y: number }> = {};
    initialBubbles.forEach((bubble) => {
      initialPositions[bubble.id] = { x: bubble.x, y: bubble.y };
    });
    setBubblePositions(initialPositions);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate position as percentage (0 to 1)
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });

      // Calculate bounce repulsion for bubbles
      if (bubblesRef.current.length > 0) {
        const newPositions: Record<number, { x: number; y: number }> = {};

        bubblesRef.current.forEach((bubble) => {
          const dx = x - bubble.x;
          const dy = y - bubble.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const repulsionRadius = 30;

          if (distance < repulsionRadius) {
            // Calculate repulsion force
            const angle = Math.atan2(dy, dx);
            const force = (1 - distance / repulsionRadius) * 25;
            newPositions[bubble.id] = {
              x: bubble.x - Math.cos(angle) * force,
              y: bubble.y - Math.sin(angle) * force,
            };
          } else {
            newPositions[bubble.id] = { x: bubble.x, y: bubble.y };
          }
        });

        setBubblePositions(newPositions);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* Primary gradient orb - tracks mouse */}
      <motion.div
        animate={{
          x: (mousePosition.x - 50) * 0.3,
          y: (mousePosition.y - 50) * 0.3,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30, mass: 1 }}
        className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-primary/40 blur-[100px] mix-blend-screen opacity-70"
        style={{ animationDuration: "8s" }}
      >
        <div
          className="w-full h-full rounded-full animate-pulse"
          style={{ animationDuration: "8s" }}
        />
      </motion.div>

      {/* Accent gradient orb - tracks mouse with offset */}
      <motion.div
        animate={{
          x: (mousePosition.x - 50) * 0.2,
          y: (mousePosition.y - 50) * 0.2,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 35, mass: 1.2 }}
        className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-accent/40 blur-[100px] mix-blend-screen opacity-70"
        style={{ animationDuration: "10s", animationDelay: "2s" }}
      >
        <div
          className="w-full h-full rounded-full animate-pulse"
          style={{ animationDuration: "10s", animationDelay: "2s" }}
        />
      </motion.div>

      {/* Secondary gradient orb - subtle mouse tracking */}
      <motion.div
        animate={{
          x: (mousePosition.x - 50) * 0.15,
          y: (mousePosition.y - 50) * 0.15,
        }}
        transition={{ type: "spring", stiffness: 35, damping: 40, mass: 1.5 }}
        className="absolute -bottom-[20%] left-[20%] w-[80%] h-[80%] rounded-full bg-primary/30 blur-[130px] mix-blend-screen opacity-60"
        style={{ animationDuration: "12s", animationDelay: "4s" }}
      >
        <div
          className="w-full h-full rounded-full animate-pulse"
          style={{ animationDuration: "12s", animationDelay: "4s" }}
        />
      </motion.div>

      {/* Floating Bubbles with bounce effect */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          initial={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            opacity: 0,
          }}
          animate={{
            left: `${bubblePositions[bubble.id]?.x || bubble.x}%`,
            top: `${bubblePositions[bubble.id]?.y || bubble.y}%`,
            opacity: [0.5, 0.85, 0.5],
            scale: [1, 1.3, 1],
          }}
          transition={{
            left: { type: "spring", stiffness: 100, damping: 25 },
            top: { type: "spring", stiffness: 100, damping: 25 },
            opacity: {
              duration: bubble.duration,
              repeat: Infinity,
              ease: "easeInOut",
            },
            scale: {
              duration: bubble.duration,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className={`absolute ${bubble.color} rounded-full blur-[25px] mix-blend-screen drop-shadow-lg`}
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            marginLeft: `-${bubble.size / 2}px`,
            marginTop: `-${bubble.size / 2}px`,
            animationDelay: `${bubble.delay}s`,
            boxShadow: `0 0 ${bubble.size * 0.5}px rgba(255, 255, 255, 0.3)`,
          }}
        />
      ))}

      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
