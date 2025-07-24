import React, { useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { EarthModel } from './EarthModel';
import AirportMarkers from './AirportMarkers';
import FlightPaths from './FlightPaths';
import StarsBackground from './StarsBackground';

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

// --- Mock Data ---
const MOCK_AIRPORTS: Airport[] = [
  {
    iata: 'TLV',
    city: 'Tel Aviv',
    country: 'Israel',
    lat: 32.0114,
    lng: 34.8867,
    timezone: 'Asia/Jerusalem',
    description: 'Ben Gurion Airport',
  },
  {
    iata: 'JFK',
    city: 'New York',
    country: 'USA',
    lat: 40.6413,
    lng: -73.7781,
    timezone: 'America/New_York',
    description: 'John F. Kennedy International Airport',
  },
];

const MOCK_ROUTES: Route[] = [
  {
    source: 'TLV',
    target: 'JFK',
    airline: 'El Al',
    flight_number: 'LY001',
    duration: '11h',
    distance_km: 9100,
    status: 'active',
  },
];

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
  // ...existing code...
  const earthRadius = 2;
  const airports = MOCK_AIRPORTS;
  const routes = MOCK_ROUTES;
  const flightRoutes = computeFlightRoutes(airports, routes, earthRadius);

  const handleSelectAirport = useCallback(() => {
    // Add any additional logic for airport selection here
  }, []);

  return (
    <Canvas style={{ height: 600, width: '100%' }}>
      <Suspense fallback={null}>
        <EarthModel />
        <AirportMarkers airports={airports} radius={earthRadius} onSelectAirport={handleSelectAirport} />
        <FlightPaths flightRoutes={flightRoutes} />
        <StarsBackground numStars={100} />
      </Suspense>
    </Canvas>
  );
};

export default GalacticGlobeApp;