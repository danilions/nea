import React, { useState } from 'react';
import { Sphere, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { useTranslation } from 'react-i18next';

interface Airport {
  iata: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  timezone: string;
  icao?: string;
  gmt_offset?: number;
  description?: string;
}

interface AirportMarkerProps {
  airport: Airport;
  radius: number;
  // eslint-disable-next-line no-unused-vars
  onSelect: (airport: Airport) => void;
}

const latLngToVec3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
};


const AirportMarker = React.memo(({ airport, radius, onSelect }: AirportMarkerProps) => {
  const { t } = useTranslation();
  const position = latLngToVec3(airport.lat, airport.lng, radius + 0.015);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <Sphere
        position={position}
        args={[0.03, 16, 16]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(airport)}
        aria-label={t('airport.markerLabel', { city: airport.city, country: airport.country })}
      >
        <meshBasicMaterial color={hovered ? '#FFD700' : '#00FFFF'} />
      </Sphere>
      {/* Visually hidden button for keyboard accessibility */}
      <Html distanceFactor={10} position={position.toArray()} zIndexRange={[100, 0]}>
        <button
          style={{
            position: 'absolute',
            width: 1,
            height: 1,
            opacity: 0,
            pointerEvents: 'auto',
            overflow: 'hidden',
            padding: 0,
            margin: 0,
            border: 0,
            clip: 'rect(0 0 0 0)',
            whiteSpace: 'nowrap',
          }}
          tabIndex={0}
          aria-label={t('airport.markerLabel', { city: airport.city, country: airport.country })}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          onClick={() => onSelect(airport)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect(airport);
            }
          }}
        />
      </Html>
      {hovered && (
        <Html distanceFactor={10} position={[0, 0.05, 0]}>
          {/*
            Color contrast note:
            bg-gray-800 (#1f2937) with text-white (#fff) is good (ratio > 12:1).
            If you want even better accessibility, consider bg-[#111827] or bg-black for max contrast.
            If you use text-gray-300 for descriptions, ensure it's not the only text and not for critical info.
          */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap opacity-90 shadow-lg border border-gray-700"
            style={{ pointerEvents: 'none', minWidth: 120 }}
          >
            <div><strong>{airport.iata}</strong> - {airport.city}, {airport.country}</div>
            <div><span className="font-semibold">ICAO:</span> {airport.icao || '-'} | <span className="font-semibold">TZ:</span> {airport.timezone}</div>
            {airport.description && <div className="mt-1 text-gray-300">{airport.description}</div>}
          </motion.div>
        </Html>
      )}
    </>
  );
});
AirportMarker.displayName = 'AirportMarker';

interface AirportMarkersProps {
  airports: Airport[];
  radius: number;
  // eslint-disable-next-line no-unused-vars
  onSelectAirport: (airport: Airport) => void;
}


const AirportMarkers = React.memo(({ airports = [], radius, onSelectAirport }: AirportMarkersProps) => {
  if (!airports || airports.length === 0) {
    return (
      <group>
        {/* No airports to display */}
        <Html center position={[0, radius + 0.2, 0]}>
          <div className="bg-red-800 text-white px-3 py-2 rounded shadow-lg text-sm">
            No airports found.
          </div>
        </Html>
      </group>
    );
  }
  return (
    <>
        {airports.map((airport) => (
            <AirportMarker key={airport.iata}
              airport={airport}
              radius={radius}
              onSelect={onSelectAirport}
            />
          ))}
    </>
  );
});
AirportMarkers.displayName = 'AirportMarkers';

export default AirportMarkers;
