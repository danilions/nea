import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';


const EarthModel = React.memo(() => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0005;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0008;
    }
  });


  return (
    <group>
      <mesh ref={earthRef}>
        <sphereGeometry />
        <meshPhongMaterial />
      </mesh>
      <mesh ref={cloudsRef} scale={[1.005, 1.005, 1.005]}>
        <sphereGeometry />
        <meshPhongMaterial />
      </mesh>
      <mesh scale={[1.001, 1.001, 1.001]}>
        <sphereGeometry />
        <meshBasicMaterial />
      </mesh>
    </group>
  );
});
EarthModel.displayName = 'EarthModel';

export { EarthModel };
