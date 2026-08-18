// /components/ui/card-hover-effect.tsx
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

interface HoverEffectProps {
  items: any[];
  children: (item: any, index: number) => React.ReactNode; // ✅ accepts index
}

export function HoverEffect({ items, children }: HoverEffectProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <Card key={index} item={item} index={index}>
          {children(item, index)}  {/* ✅ pass index */}
        </Card>
      ))}
    </div>
  );
}

function Card({ item, index, children }: { item: any; index: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [8, -8]),
    { stiffness: 400, damping: 20 }
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-8, 8]),
    { stiffness: 400, damping: 20 }
  );
  const shadow = useSpring(
    useTransform(x, [-0.5, 0.5], [-30, 30]),
    { stiffness: 400, damping: 20 }
  );
  const shadowY = useSpring(
    useTransform(y, [-0.5, 0.5], [30, -30]),
    { stiffness: 400, damping: 20 }
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const mx = (e.clientX - rect.left) / w - 0.5;
    const my = (e.clientY - rect.top) / h - 0.5;
    x.set(mx);
    y.set(my);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        boxShadow: shadow && shadowY ? `calc(${shadow}px) calc(${shadowY}px) 80px rgba(139, 92, 246, 0.2)` : "none",
        transition: "box-shadow 0.3s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 hover:border-violet-500/70 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/25 hover:scale-[1.02] flex flex-col h-full"
    >
      {children}
    </motion.div>
  );
}