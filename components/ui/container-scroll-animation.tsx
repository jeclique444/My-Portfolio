// /components/ui/container-scroll-animation.tsx
"use client";

import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface ContainerScrollProps {
  titleComponent?: React.ReactNode;
  children: React.ReactNode;
}

export const ContainerScroll = ({ titleComponent, children }: ContainerScrollProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);
  const shadowX = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const shadowY = useTransform(mouseY, [-0.5, 0.5], [15, -15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!contentRef.current) return;
      const rect = contentRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    const element = contentRef.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <div className="relative w-full">
      {/* ✅ Small gap at top (top-16 = 64px), fully blurred background */}
      <div className="sticky top-16 z-20 bg-[#302b63]/90 backdrop-blur-xl pb-6 border-b border-white/5">
        {titleComponent && (
          <div className="text-center">{titleComponent}</div>
        )}
      </div>

      <motion.div
        ref={contentRef}
        style={{
          rotateX,
          rotateY,
          boxShadow: shadowX && shadowY ? `calc(${shadowX}px) calc(${shadowY}px) 50px rgba(139, 92, 246, 0.12)` : "none",
          transition: "box-shadow 0.3s ease",
        }}
        className="relative max-w-6xl mx-auto px-4 md:px-6 pb-16 perspective-1000"
      >
        {children}
      </motion.div>
    </div>
  );
};