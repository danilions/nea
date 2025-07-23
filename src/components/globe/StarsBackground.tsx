import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface StarsBackgroundProps {
  numStars?: number;
  radius?: number;
  starSize?: number;
  opacity?: number;
}

const StarsBackground = React.memo(({ numStars = 10000, radius = 150, starSize = 0.15, opacity = 0.9 }: StarsBackgroundProps) => {
  const positions = useRef<Float32Array | null>(null);

  if (!positions.current) {
    const p = new Float32Array(numStars * 3);
    for (let i = 0; i < numStars; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);
      p[i * 3] = x;
      p[i * 3 + 1] = y;
      p[i * 3 + 2] = z;
    }
    positions.current = p;
  }

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions.current!, 3));
    return geom;
  }, []);

  return (
    <points geometry={geometry}>
      <pointsMaterial color="#FFFFFF" size={starSize} sizeAttenuation={true} transparent opacity={opacity} />
    </points>
  );
});
StarsBackground.displayName = 'StarsBackground';

export default StarsBackground;
