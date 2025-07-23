import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface EarthModelProps {
  radius: number;
  mapTexture: THREE.Texture | null;
  bumpMapTexture: THREE.Texture | null;
  specularMapTexture: THREE.Texture | null;
  cloudsTexture: THREE.Texture | null;
  nightLightsTexture: THREE.Texture | null;
}

const EarthModel = React.memo(({ radius, mapTexture, bumpMapTexture, specularMapTexture, cloudsTexture, nightLightsTexture }: EarthModelProps) => {
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

  const earthMaterial = useMemo(() => {
    if (!mapTexture || !bumpMapTexture || !specularMapTexture) return null;
    return new THREE.MeshPhongMaterial({
      map: mapTexture,
      bumpMap: bumpMapTexture,
      bumpScale: 0.005,
      specularMap: specularMapTexture,
      specular: new THREE.Color('grey'),
      shininess: 10,
    });
  }, [mapTexture, bumpMapTexture, specularMapTexture]);

  const cloudsMaterial = useMemo(() => {
    if (!cloudsTexture) return null;
    return new THREE.MeshPhongMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
  }, [cloudsTexture]);

  const nightLightsMaterial = useMemo(() => {
    if (!nightLightsTexture) return null;
    return new THREE.MeshBasicMaterial({
      map: nightLightsTexture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.7,
    });
  }, [nightLightsTexture]);

  if (!earthMaterial) {
    return (
      <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial color="darkblue" />
      </mesh>
    );
  }

  return (
    <group>
      <mesh ref={earthRef} rotation={[0, 0, 0]} material={earthMaterial}>
        <sphereGeometry args={[radius, 64, 64]} />
      </mesh>
      {cloudsMaterial && (
        <mesh ref={cloudsRef} scale={[1.005, 1.005, 1.005]} material={cloudsMaterial}>
          <sphereGeometry args={[radius, 64, 64]} />
        </mesh>
      )}
      {nightLightsMaterial && (
        <mesh scale={[1.001, 1.001, 1.001]} material={nightLightsMaterial}>
          <sphereGeometry args={[radius, 64, 64]} />
        </mesh>
      )}
    </group>
  );
});
EarthModel.displayName = 'EarthModel';

export default EarthModel;
