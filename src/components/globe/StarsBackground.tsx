"use client";
import React, { useMemo, Suspense } from 'react';
import dynamic from 'next/dynamic';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

function StarsPrimitive({
  numStars = 5000,
  radius = 150,
  starSize = 0.15,
  opacity = 0.9,
  color = '#FFFFFF',
}) {
  // Removed unused pointsRef
  const positions = useMemo(() => {
    const arr = new Float32Array(numStars * 3);
    for (let i = 0; i < numStars; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, [numStars, radius]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({ color, size: starSize, opacity });
  }, [color, starSize, opacity]);

  // Animate rotation using a ref to the group
  const groupRef = React.useRef<THREE.Group>(null);
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005;
    }
  });

  // Render points only if geometry and material are defined
  return (
    <group ref={groupRef}>
      {geometry && material && (
        <points geometry={geometry} material={material} />
      )}
    </group>
  );
}

interface StarsBackgroundProps {
  numStars?: number;
  radius?: number;
  starSize?: number;
  opacity?: number;
  color?: string;
}

const StarsBackground = dynamic<StarsBackgroundProps>(
  () =>
    Promise.resolve(function StarsBackgroundDynamic(props: StarsBackgroundProps) {
      return (
        <Suspense fallback={null}>
          <StarsPrimitive {...props} />
        </Suspense>
      );
    }),
  { ssr: false }
);

export default StarsBackground;
