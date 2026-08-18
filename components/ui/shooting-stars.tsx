// /components/ui/shooting-stars.tsx
"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef } from "react";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  cursorX?: number;   // Mouse X position (0–1)
  cursorY?: number;   // Mouse Y position (0–1)
  className?: string;
}

const getRandomStartPoint = (cursorX?: number, cursorY?: number, width?: number, height?: number) => {
  // If cursor position is provided, spawn near cursor
  if (cursorX !== undefined && cursorY !== undefined && width && height) {
    // Spread around cursor with some randomness
    const offsetX = (Math.random() - 0.5) * 600;
    const offsetY = (Math.random() - 0.5) * 600;
    let x = cursorX * width + offsetX;
    let y = cursorY * height + offsetY;
    // Clamp to viewport edges
    x = Math.max(0, Math.min(width, x));
    y = Math.max(0, Math.min(height, y));
    // Random angle slightly biased toward center
    const angle = 45 + Math.random() * 20 - 10; // 35–55 degrees
    return { x, y, angle };
  }

  // Fallback to random edge
  const side = Math.floor(Math.random() * 4);
  const offset = Math.random() * (width || window.innerWidth);

  switch (side) {
    case 0:
      return { x: offset, y: 0, angle: 45 };
    case 1:
      return { x: width || window.innerWidth, y: offset, angle: 135 };
    case 2:
      return { x: offset, y: height || window.innerHeight, angle: 225 };
    case 3:
      return { x: 0, y: offset, angle: 315 };
    default:
      return { x: 0, y: 0, angle: 45 };
  }
};

export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 200,      // ✅ Faster: was 1200
  maxDelay = 800,      // ✅ Faster: was 4200
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 20,      // ✅ Bigger: was 10
  starHeight = 2,      // ✅ Bigger: was 1
  cursorX,
  cursorY,
  className,
}) => {
  const [star, setStar] = useState<ShootingStar | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const createStar = () => {
      const { x, y, angle } = getRandomStartPoint(
        cursorX,
        cursorY,
        dimensions.width,
        dimensions.height
      );
      const newStar: ShootingStar = {
        id: Date.now(),
        x,
        y,
        angle,
        scale: 1,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
      };
      setStar(newStar);

      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
      setTimeout(createStar, randomDelay);
    };

    createStar();

    return () => {};
  }, [minSpeed, maxSpeed, minDelay, maxDelay, cursorX, cursorY, dimensions]);

  useEffect(() => {
    const moveStar = () => {
      if (star) {
        setStar((prevStar) => {
          if (!prevStar) return null;
          const newX =
            prevStar.x +
            prevStar.speed * Math.cos((prevStar.angle * Math.PI) / 180);
          const newY =
            prevStar.y +
            prevStar.speed * Math.sin((prevStar.angle * Math.PI) / 180);
          const newDistance = prevStar.distance + prevStar.speed;
          const newScale = 1 + newDistance / 100;
          if (
            newX < -20 ||
            newX > (dimensions.width || window.innerWidth) + 20 ||
            newY < -20 ||
            newY > (dimensions.height || window.innerHeight) + 20
          ) {
            return null;
          }
          return {
            ...prevStar,
            x: newX,
            y: newY,
            distance: newDistance,
            scale: newScale,
          };
        });
      }
    };

    const animationFrame = requestAnimationFrame(moveStar);
    return () => cancelAnimationFrame(animationFrame);
  }, [star, dimensions]);

  return (
    <svg
      ref={svgRef}
      className={cn("w-full h-full absolute inset-0 pointer-events-none", className)}
    >
      {star && (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          fill="url(#gradient)"
          transform={`rotate(${star.angle}, ${
            star.x + (starWidth * star.scale) / 2
          }, ${star.y + starHeight / 2})`}
        />
      )}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop
            offset="100%"
            style={{ stopColor: starColor, stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};