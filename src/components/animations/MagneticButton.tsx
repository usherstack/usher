import React, { useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

type MagneticButtonProps = {
  children: React.ReactNode;
  strength?: number;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<typeof motion.button>, "children">;

export function MagneticButton({
  children,
  strength = 30,
  className,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isMobile = useIsMobile();

  // Use useSpring for smooth, performant animations without re-renders
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Disable effect on mobile
    if (isMobile || !buttonRef.current) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } =
      buttonRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Update spring values
    x.set(middleX * (strength / 100));
    y.set(middleY * (strength / 100));
  };

  const reset = () => {
    if (isMobile) return;
    // Reset spring values
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      // Apply styles directly from spring values
      style={!isMobile ? { x, y } : {}}
      className={cn("magnetic relative", className)}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
