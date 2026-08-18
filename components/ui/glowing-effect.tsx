// /components/ui/glowing-effect.tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface GlowingEffectProps {
  blur?: number;
  borderWidth?: number;
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  proximity?: number;
  inactiveZone?: number;
}

export function GlowingEffect({
  blur = 0,
  borderWidth = 2,
  spread = 40,
  glow = true,
  disabled = false,
  proximity = 64,
  inactiveZone = 0.01,
}: GlowingEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = (rect.width + spread * 2) * dpr;
    canvas.height = (rect.height + spread * 2) * dpr;
    canvas.style.width = rect.width + spread * 2 + "px";
    canvas.style.height = rect.height + spread * 2 + "px";
    canvas.style.position = "absolute";
    canvas.style.top = `-${spread}px`;
    canvas.style.left = `-${spread}px`;
    canvas.style.pointerEvents = "none";
    ctx.scale(dpr, dpr);

    let animationFrame: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (disabled || !glow) {
        // If disabled or glow off, draw nothing
        return;
      }

      // Determine if we should draw the glow
      const shouldGlow = isHovered;

      if (!shouldGlow) {
        // Draw a subtle static border when not hovering
        ctx.beginPath();
        ctx.roundRect(
          spread,
          spread,
          rect.width,
          rect.height,
          12 // rounded corners
        );
        ctx.strokeStyle = "rgba(139, 92, 246, 0.15)";
        ctx.lineWidth = borderWidth;
        ctx.stroke();
        return;
      }

      // Compute distance from mouse to the center of the border
      // We'll use the mouse position relative to the container
      const cx = rect.width / 2 + spread;
      const cy = rect.height / 2 + spread;
      const dx = mousePos.x - cx;
      const dy = mousePos.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = Math.min(rect.width, rect.height) / 2 + spread;

      // Normalize proximity: 0 when far, 1 when close
      const proximityFactor = Math.max(0, 1 - dist / maxDist);

      // Build a gradient that follows the mouse
      const gradient = ctx.createRadialGradient(
        mousePos.x,
        mousePos.y,
        0,
        mousePos.x,
        mousePos.y,
        spread * 2
      );

      const alpha = proximityFactor * 0.8 + 0.2;
      gradient.addColorStop(0, `rgba(168, 85, 247, ${alpha})`); // purple
      gradient.addColorStop(0.5, `rgba(139, 92, 246, ${alpha * 0.7})`);
      gradient.addColorStop(1, `rgba(139, 92, 246, 0)`);

      ctx.shadowColor = "rgba(168, 85, 247, 0.5)";
      ctx.shadowBlur = blur || 20;
      ctx.beginPath();
      ctx.roundRect(
        spread,
        spread,
        rect.width,
        rect.height,
        12 // rounded corners
      );
      ctx.strokeStyle = gradient;
      ctx.lineWidth = borderWidth;
      ctx.stroke();

      // Optionally add an outer glow
      if (glow) {
        ctx.shadowBlur = 60;
        ctx.shadowColor = "rgba(168, 85, 247, 0.3)";
        ctx.strokeStyle = "rgba(168, 85, 247, 0.1)";
        ctx.lineWidth = borderWidth * 2;
        ctx.stroke();
      }

      animationFrame = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left + spread;
      const y = e.clientY - rect.top + spread;
      setMousePos({ x, y });
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    draw();

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, [blur, borderWidth, spread, glow, disabled, proximity, inactiveZone, isHovered, mousePos]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}