import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Route {
  source: string;
  target: string;
  airline?: string;
  flight_number?: string;
  duration?: string;
  distance_km?: number;
  status?: string;
}

export interface FlightPathData {
  start: THREE.Vector3;
  end: THREE.Vector3;
  routeInfo: Route;
  index: number;
}

interface FlightPathsProps {
  flightRoutes: FlightPathData[];
}

const FlightPath = React.memo(({ start, end, index }: { start: THREE.Vector3, end: THREE.Vector3, index: number }) => {
  const lightRef = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    start,
    start.clone().lerp(end, 0.5).setLength(start.length() * 1.15),
    end
  ]), [start, end]);

  useFrame(({ clock }) => {
    if (lightRef.current) {
      const t = (clock.getElapsedTime() * 0.05 + index * 0.02) % 1;
      const point = curve.getPointAt(t);
      (lightRef.current.position as THREE.Vector3).copy(point);
    }
  });

  return (
    <group>
      <line>
        <bufferGeometry {...new THREE.BufferGeometry().setFromPoints(curve.getPoints(50))} />
        <lineBasicMaterial color="#00FF00" />
      </line>
      <mesh ref={lightRef}>
        <sphereGeometry />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );
});
FlightPath.displayName = 'FlightPath';

const FlightPaths = React.memo(({ flightRoutes }: FlightPathsProps) => {
  return (
    <>
      {flightRoutes.map((route, index) => (
        <FlightPath key={`${route.routeInfo.source}-${route.routeInfo.target}-${index}`} start={route.start} end={route.end} index={index} />
      ))}
    </>
  );
});
FlightPaths.displayName = 'FlightPaths';

export default FlightPaths;
