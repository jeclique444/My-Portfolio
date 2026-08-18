// /components/ui/aurora-background.tsx
"use client";

import React from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode; // ✅ Fixed: made optional
}

export function AuroraBackground({ children, className, ...props }: AuroraBackgroundProps) {
  return (
    <div
      className={`relative overflow-hidden bg-[#0a0a1a] ${className}`}
      {...props}
    >
      {/* Aurora layers — more vibrant violet/purple */}
      <div className="absolute inset-0 opacity-80">
        {/* Layer 1 — Main violet/purple aurora */}
        <div 
          className="absolute inset-0 animate-aurora"
          style={{
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(139, 92, 246, 0.6), transparent 50%),
              radial-gradient(ellipse at 80% 20%, rgba(124, 58, 237, 0.5), transparent 50%),
              radial-gradient(ellipse at 50% 80%, rgba(167, 139, 250, 0.4), transparent 50%)
            `,
            backgroundSize: '300% 300%',
          }}
        />
        
        {/* Layer 2 — Secondary violet glow */}
        <div 
          className="absolute inset-0 animate-aurora"
          style={{
            background: `
              radial-gradient(ellipse at 60% 40%, rgba(139, 92, 246, 0.5), transparent 50%),
              radial-gradient(ellipse at 30% 70%, rgba(124, 58, 237, 0.4), transparent 50%),
              radial-gradient(ellipse at 90% 60%, rgba(196, 181, 253, 0.3), transparent 50%)
            `,
            backgroundSize: '300% 300%',
            animationDelay: '-20s',
          }}
        />
        
        {/* Layer 3 — Soft purple accents */}
        <div 
          className="absolute inset-0 animate-aurora"
          style={{
            background: `
              radial-gradient(ellipse at 70% 30%, rgba(167, 139, 250, 0.4), transparent 50%),
              radial-gradient(ellipse at 40% 60%, rgba(196, 181, 253, 0.3), transparent 50%),
              radial-gradient(ellipse at 10% 80%, rgba(139, 92, 246, 0.3), transparent 50%)
            `,
            backgroundSize: '300% 300%',
            animationDelay: '-40s',
          }}
        />
      </div>
      
      {/* Optional: Subtle stars/particles overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(2px 2px at 20px 30px, #eee, transparent),
                            radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
                            radial-gradient(2px 2px at 50px 160px, #ddd, transparent),
                            radial-gradient(2px 2px at 90px 40px, rgba(255,255,255,0.6), transparent),
                            radial-gradient(2px 2px at 130px 80px, #fff, transparent),
                            radial-gradient(2px 2px at 160px 30px, rgba(255,255,255,0.7), transparent)`,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
        }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}