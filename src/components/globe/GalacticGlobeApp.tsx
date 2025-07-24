"use client";
import React, { useCallback, Suspense, useEffect, useState } from 'react';
// ...existing code...
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { EarthModel } from './EarthModel';
import AirportMarkers from './AirportMarkers';
import FlightPaths from './FlightPaths';
import StarsBackground from './StarsBackground';
import { Html } from '@react-three/drei';

// --- Types ---
interface Airport {
  iata: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  timezone: string;
  description?: string;
}

interface Route {
  source: string;
  target: string;
  airline: string;
  flight_number: string;
  duration: string;
  distance_km: number;
  status: string;
}

interface FlightRoute {
  start: THREE.Vector3;
  end: THREE.Vector3;
  routeInfo: Route;
  index: number;
}

// --- Dynamic Data State ---
interface AirportsRoutesData {
  airports: Airport[];
  routes: Route[];
}

function computeFlightRoutes(airports: Airport[], routes: Route[], earthRadius: number): FlightRoute[] {
  return routes.map((route, idx) => {
    const source = airports.find(a => a.iata === route.source);
    const target = airports.find(a => a.iata === route.target);
    if (!source || !target) return null;
    const phiStart = (90 - source.lat) * (Math.PI / 180);
    const thetaStart = (source.lng + 180) * (Math.PI / 180);
    const phiEnd = (90 - target.lat) * (Math.PI / 180);
    const thetaEnd = (target.lng + 180) * (Math.PI / 180);
    const start = new THREE.Vector3(
      -earthRadius * Math.sin(phiStart) * Math.cos(thetaStart),
      earthRadius * Math.cos(phiStart),
      earthRadius * Math.sin(phiStart) * Math.sin(thetaStart)
    );
    const end = new THREE.Vector3(
      -earthRadius * Math.sin(phiEnd) * Math.cos(thetaEnd),
      earthRadius * Math.cos(phiEnd),
      earthRadius * Math.sin(phiEnd) * Math.sin(thetaEnd)
    );
    return {
      start,
      end,
      routeInfo: route,
      index: idx,
    };
  }).filter(Boolean) as FlightRoute[];
}

const GalacticGlobeApp: React.FC = () => {
  const earthRadius = 2;
  const [airports, setAirports] = useState<Airport[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch('/airports-routes.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch airports-routes.json');
        return res.json();
      })
      .then((data: AirportsRoutesData) => {
        if (isMounted) {
          setAirports(Array.isArray(data.airports) ? data.airports : []);
          setRoutes(Array.isArray(data.routes) ? data.routes : []);
          setError(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setAirports([]);
          setRoutes([]);
          setError(true);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  const flightRoutes = computeFlightRoutes(airports, routes, earthRadius);

  const handleSelectAirport = useCallback(() => {
    // Add any additional logic for airport selection here
  }, []);

  return (
    <Canvas style={{ height: '100vh', width: '100vw' }}>
      <Suspense fallback={null}>
        <EarthModel />
        <AirportMarkers airports={airports} radius={earthRadius} onSelectAirport={handleSelectAirport} />
        <FlightPaths flightRoutes={flightRoutes} />
        <StarsBackground numStars={100} />
        {loading && (
          <Html center position={[0, earthRadius + 0.5, 0]}>
            <div className="bg-blue-900 text-white px-3 py-2 rounded shadow-lg text-sm">Loading airports & routes…</div>
          </Html>
        )}
        {!loading && error && (
          <Html center position={[0, earthRadius + 0.5, 0]}>
            <div className="bg-red-800 text-white px-3 py-2 rounded shadow-lg text-sm">Failed to load airports/routes data.</div>
          </Html>
        )}
      </Suspense>
    </Canvas>
  );
};

export default GalacticGlobeApp;