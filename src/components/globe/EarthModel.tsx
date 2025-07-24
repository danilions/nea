
import React, { useRef } from 'react';
import { useFrame, useLoader, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { MeshPhongMaterial } from 'three';
extend({ MeshPhongMaterial });


const EarthModel = React.memo(() => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  // Load textures with error handling (hooks must not be in try/catch)
  const [textureError, setTextureError] = React.useState(false);
  const earthMap = useLoader(THREE.TextureLoader, '/earth_map.jpg', loader => {
    loader.manager.onError = url => {
      console.error('[EarthModel] Texture load error:', url);
      setTextureError(true);
    };
  });
  const earthBump = useLoader(THREE.TextureLoader, '/earth_bump.jpg', loader => {
    loader.manager.onError = url => {
      console.error('[EarthModel] Texture load error:', url);
      setTextureError(true);
    };
  });
  const earthSpecular = useLoader(THREE.TextureLoader, '/earth_specular.jpg', loader => {
    loader.manager.onError = url => {
      console.error('[EarthModel] Texture load error:', url);
      setTextureError(true);
    };
  });
  const earthClouds = useLoader(THREE.TextureLoader, '/earth_clouds.png', loader => {
    loader.manager.onError = url => {
      console.error('[EarthModel] Texture load error:', url);
      setTextureError(true);
    };
  });

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
        <sphereGeometry args={[2, 64, 64]} />
        {textureError ? (
          // Fallback: solid gray wireframe sphere
          <meshStandardMaterial color="gray" wireframe={true} />
        ) : (
          <meshPhongMaterial ref={mat => {
            if (mat) {
              mat.map = earthMap ?? null;
              mat.bumpMap = earthBump ?? null;
              mat.specularMap = earthSpecular ?? null;
              mat.specular = new THREE.Color('grey');
              mat.needsUpdate = true;
            }
          }} />
        )}
      </mesh>
      <mesh ref={cloudsRef} scale={[1.005, 1.005, 1.005]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial ref={mat => {
          if (mat) {
            mat.map = earthClouds ?? null;
            mat.transparent = true;
            mat.opacity = 0.4;
            mat.needsUpdate = true;
          }
        }} />
      </mesh>
    </group>
  );
});
EarthModel.displayName = 'EarthModel';

export { EarthModel };
