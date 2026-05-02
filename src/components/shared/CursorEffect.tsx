import React, { useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { throttle } from "lodash";

// @ts-nocheck

interface Sprinkle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  createdAt: number;
}

const MAX_SPRINKLES = 30;
const SPRINKLE_LIFESPAN = 600; // in ms

export function CursorEffect() {
  try {
    const isMobile = useIsMobile();
    const sprinklesRef = useRef<Sprinkle[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mousePosition = useRef({ x: 0, y: 0 });
    const lastSprinkleTime = useRef(0);

    // Use springs for the glow effect for performance
    const glowX = useSpring(0, { type: "spring", stiffness: 150, damping: 50 });
    const glowY = useSpring(0, { type: "spring", stiffness: 150, damping: 50 });

    const updateMousePosition = throttle((e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      glowX.set(e.clientX - 192); // 192 = half of glow size
      glowY.set(e.clientY - 192);
    }, 16);

    useEffect(() => {
      if (isMobile) return;

      window.addEventListener("mousemove", updateMousePosition);
      return () => {
        window.removeEventListener("mousemove", updateMousePosition);
        updateMousePosition.cancel();
      };
    }, [isMobile]);

    useEffect(() => {
      if (isMobile || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d")!;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const now = Date.now();

        // Create new sprinkles
        if (now - lastSprinkleTime.current > 50 && sprinklesRef.current.length < MAX_SPRINKLES) {
          lastSprinkleTime.current = now;
          sprinklesRef.current.push({
            id: now,
            createdAt: now,
            x: mousePosition.current.x,
            y: mousePosition.current.y,
            angle: Math.random() * Math.PI * 2,
            distance: 30 + Math.random() * 20,
          });
        }

        // Draw and update sprinkles
        sprinklesRef.current.forEach((sprinkle, index) => {
          const elapsed = now - sprinkle.createdAt;
          if (elapsed > SPRINKLE_LIFESPAN) {
            sprinklesRef.current.splice(index, 1);
            return;
          }

          const progress = elapsed / SPRINKLE_LIFESPAN;
          const currentDistance = sprinkle.distance * progress;
          const opacity = 1 - progress;

          const x = sprinkle.x + Math.cos(sprinkle.angle) * currentDistance;
          const y = sprinkle.y + Math.sin(sprinkle.angle) * currentDistance;

          ctx.fillStyle = `rgba(var(--color-primary-rgb), ${opacity})`;
          ctx.fillRect(x, y, 2, 2);
        });

        requestAnimationFrame(render);
      };

      const animationFrameId = requestAnimationFrame(render);

      const handleResize = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
      }
      window.addEventListener('resize', handleResize);

      return () => {
          cancelAnimationFrame(animationFrameId);
          window.removeEventListener('resize', handleResize);
      }

    }, [isMobile]);

    if (isMobile) return null;

    return (
      <>
        {/* Sprinkles are now drawn on a canvas */}
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100]"
        />

        {/* Main cursor glow effect */}
        <motion.div
          className="fixed top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none z-[-1]"
          style={{ x: glowX, y: glowY }}
        />
      </>
    );
  } catch (error) {
    // TODO: This is a temporary fix to prevent the app from crashing.
    // The underlying issue with the CursorEffect component should be investigated further.
    console.error("An error occurred in the CursorEffect component:", error);
    return null;
  }
}
