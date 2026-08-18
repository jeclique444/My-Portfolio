// /components/ui/ParticleAttractor.tsx
"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';

const ParticleSwarm = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 12000;
  const speedMult = 0.25;

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
      sz[i] = 0.15 + Math.random() * 0.25;
    }
    return { positions: pos, colors: col, sizes: sz };
  }, [count]);

  const PARAMS = useMemo(() => ({
    scale: 90,
    spread: 0.8,
    flow: 0.6,
    morph: 0.2
  }), []);

  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const targetColor = useMemo(() => new THREE.Color(), []);
  const tempPos = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime() * speedMult;
    const positionsAttr = pointsRef.current.geometry.attributes.position;
    const colorsAttr = pointsRef.current.geometry.attributes.color;
    if (!positionsAttr || !colorsAttr) return;
    const posArray = positionsAttr.array as Float32Array;
    const colArray = colorsAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const t = i / count;
      const theta = t * Math.PI * 40.0;
      const r0 = 0.35 + 0.65 * Math.sqrt(t);

      const w1 = Math.sin(theta * 0.7 + time * 0.15);
      const w2 = Math.sin(theta * 1.9 - time * 0.10);
      const w3 = Math.cos(theta * 3.3 + time * 0.07);
      const attract = r0 * (1.0 + 0.25 * w1 + 0.12 * w2 * w3);
      const bend = 0.6 * Math.sin(theta * 0.5 + time * 0.12) + 0.2 * Math.sin(theta * 2.7 - time * 0.08);

      const { scale, spread, flow, morph } = PARAMS;

      const px = scale * attract * Math.cos(theta + bend * spread);
      const py = scale * attract * Math.sin(theta + bend * spread);
      const pz = scale * (0.55 * Math.sin(theta * 0.55) + 0.28 * Math.sin(theta * 1.73 + time * 0.12) + 0.15 * Math.cos(theta * 4.1));
      const swirl = flow * Math.sin(Math.sqrt(px * px + py * py) * 0.06 - time * 0.5);

      const finalX = px + swirl * py * 0.12;
      const finalY = py - swirl * px * 0.12;
      const finalZ = pz + scale * morph * 0.18 * Math.sin(theta * 0.9 + time * 0.20);

      targetPos.set(finalX, finalY, finalZ);

      tempPos.set(posArray[i3], posArray[i3 + 1], posArray[i3 + 2]);
      tempPos.lerp(targetPos, 0.08);
      posArray[i3] = tempPos.x;
      posArray[i3 + 1] = tempPos.y;
      posArray[i3 + 2] = tempPos.z;

      // Violet colors
      const hue = 0.72 + 0.06 * Math.sin(theta * 0.08 + time * 0.02);
      const sat = 0.7 + 0.2 * (0.5 + 0.5 * Math.sin(theta * 0.31));
      const light = 0.5 + 0.25 * Math.exp(-Math.abs(attract - 0.75));
      targetColor.setHSL(hue, sat, light);
      colArray[i3] = targetColor.r;
      colArray[i3 + 1] = targetColor.g;
      colArray[i3 + 2] = targetColor.b;
    }
    positionsAttr.needsUpdate = true;
    colorsAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.35}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
};

export default function ParticleAttractor() {
  return (
    <Canvas
      camera={{ position: [0, 0, 100], fov: 60 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      gl={{ alpha: true }}
    >
      <color attach="background" args={['#302b63']} />
      <fog attach="fog" args={['#302b63', 0.01]} />
      <ParticleSwarm />
      <EffectComposer>
        <Bloom 
          intensity={0.8} 
          radius={0.5} 
          luminanceThreshold={0.1}   // ✅ fixed: changed 'threshold' to 'luminanceThreshold'
        />
      </EffectComposer>
    </Canvas>
  );
}