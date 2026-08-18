// /components/ui/vortex.tsx
"use client";

import { useEffect, useRef, useState } from 'react';

interface VortexProps {
  backgroundColor?: string;
  rangeY?: number;
  particleCount?: number;
  baseHue?: number;
  particleSaturation?: number;
  particleLightness?: number;
  className?: string;
  children?: React.ReactNode;
}

export function Vortex({
  backgroundColor = 'black',
  rangeY = 800,
  particleCount = 300,
  baseHue = 220,
  particleSaturation = 80,
  particleLightness = 60,
  className = '',
  children,
}: VortexProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<any[]>([]);
  const animationRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    // ✅ FIX: Use viewport dimensions para siguradong FULL PAGE
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / width) * 2 - 1;
      const y = (e.clientY / height) * 2 - 1;
      setMousePosition({ x, y });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Create particles
    const createParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * Math.min(width, height) * 0.6;
        const speed = 0.002 + Math.random() * 0.005;
        const hue = baseHue + (Math.random() - 0.5) * 30;
        particlesRef.current.push({
          x: width / 2 + Math.cos(angle) * radius,
          y: height / 2 + Math.sin(angle) * radius,
          targetX: width / 2 + Math.cos(angle) * radius,
          targetY: height / 2 + Math.sin(angle) * radius,
          angle,
          radius,
          speed,
          hue,
          size: 2 + Math.random() * 4,
          opacity: 0.3 + Math.random() * 0.5,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };
    createParticles();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2 + mousePosition.x * 150;
      const centerY = height / 2 + mousePosition.y * 150;

      particlesRef.current.forEach((p) => {
        const dx = p.x - centerX;
        const dy = p.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        const newAngle = angle + p.speed * (1 + (dist / Math.max(width, height)) * 0.5);
        const newRadius = dist + Math.sin(p.pulse) * 0.5;
        p.pulse += 0.02;

        p.x += (centerX + Math.cos(newAngle) * newRadius - p.x) * 0.02;
        p.y += (centerY + Math.sin(newAngle) * newRadius - p.y) * 0.02;

        const alpha = p.opacity * (0.5 + 0.5 * (1 - dist / Math.max(width, height) * 0.8));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.5 + 0.5 * (1 - dist / Math.max(width, height) * 0.8)), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, ${particleSaturation}%, ${particleLightness}%, ${alpha})`;
        ctx.fill();

        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        glow.addColorStop(0, `hsla(${p.hue}, ${particleSaturation}%, ${particleLightness}%, ${alpha * 0.5})`);
        glow.addColorStop(1, `hsla(${p.hue}, ${particleSaturation}%, ${particleLightness}%, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      });

      // Connecting lines
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const opacity = (1 - dist / 100) * 0.1;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.strokeStyle = `hsla(${baseHue}, ${particleSaturation}%, ${particleLightness + 10}%, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, [particleCount, baseHue, particleSaturation, particleLightness, mousePosition]);

  return (
    <div ref={containerRef} className={`fixed inset-0 w-full h-full overflow-hidden ${className}`} style={{ background: backgroundColor }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}