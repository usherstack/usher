import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { throttle } from "lodash";

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
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement[]>([]);

  // Use refs to store positions and avoid re-renders
  const mousePosition = useRef({ x: 0, y: 0 });

  // Throttle mouse move handler for performance
  const handleMouseMove = throttle((e: MouseEvent) => {
    mousePosition.current = { x: e.clientX, y: e.clientY };
  }, 16); // ~60fps

  useEffect(() => {
    if (isMobile) return;

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      handleMouseMove.cancel(); // Clean up lodash throttle
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const animateBubbles = () => {
      bubblesRef.current.forEach((bubble) => {
        const { x, y } = mousePosition.current;
        const bubbleRect = bubble.getBoundingClientRect();

        const dx = x - (bubbleRect.left + bubbleRect.width / 2);
        const dy = y - (bubbleRect.top + bubbleRect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repulsionRadius = 150; // Increased radius

        if (distance < repulsionRadius) {
          const angle = Math.atan2(dy, dx);
          const force = (1 - distance / repulsionRadius) * 30; // Stronger force
          const newX = -Math.cos(angle) * force;
          const newY = -Math.sin(angle) * force;
          bubble.style.transform = `translate(${newX}px, ${newY}px)`;
        } else {
          bubble.style.transform = `translate(0, 0)`;
        }
      });

      requestAnimationFrame(animateBubbles);
    };

    const animationFrameId = requestAnimationFrame(animateBubbles);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isMobile]);

  // Disable on mobile
  if (isMobile) return null;

  const initialBubbles: Bubble[] = Array.from({ length: 18 }, (_, i) => {
    const colors = [
      "bg-primary/50",
      "bg-accent/50",
      "bg-blue-400/50",
      "bg-purple-400/50",
      "bg-pink-400/50",
      "bg-cyan-400/50",
      "bg-indigo-400/50",
    ];
    return {
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 120 + 40,
      duration: Math.random() * 6 + 8,
      delay: Math.random() * 3,
      color: colors[i % colors.length],
    };
  });

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]"
    >
      {/* Orbs are now simple CSS animations, less JS overhead */}
      <div className="orb-1" />
      <div className="orb-2" />
      <div className="orb-3" />

      {initialBubbles.map((bubble, index) => (
        <div
          key={bubble.id}
          ref={(el) => (bubblesRef.current[index] = el!)}
          className={`absolute ${bubble.color} rounded-full blur-[25px] mix-blend-screen drop-shadow-lg`}
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            marginLeft: `-${bubble.size / 2}px`,
            marginTop: `-${bubble.size / 2}px`,
            transition: "transform 0.5s ease-out", // Smooth transition
            animation: `float ${bubble.duration}s ease-in-out infinite`,
            animationDelay: `${bubble.delay}s`,
          }}
        />
      ))}

      {/* CSS for orbs and float animation */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 0.85; }
        }

        .orb-1, .orb-2, .orb-3 {
            position: absolute;
            border-radius: 50%;
            mix-blend-screen;
            opacity: 0.6;
            blur: 100px;
            animation: pulse 10s infinite alternate;
        }

        .orb-1 {
            width: 70%; height: 70%;
            top: -40%; left: -20%;
            background-color: rgba(var(--color-primary), 0.4);
        }

        .orb-2 {
            width: 60%; height: 60%;
            top: 20%; right: -20%;
            background-color: rgba(var(--color-accent), 0.4);
            animation-delay: 2s;
        }

        .orb-3 {
            width: 80%; height: 80%;
            bottom: -20%; left: 20%;
            background-color: rgba(var(--color-primary), 0.3);
            animation-delay: 4s;
        }

        @keyframes pulse {
          0% { transform: scale(0.95); }
          100% { transform: scale(1.05); }
        }
      `}</style>

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
