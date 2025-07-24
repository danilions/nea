"use client";
import { Canvas } from '@react-three/fiber';

export default function GlobeDemo() {
  return (
    <Canvas style={{ width: '100vw', height: '100vh' }} camera={{ position: [0, 0, 5], fov: 75 }}>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </Canvas>
  );
}
