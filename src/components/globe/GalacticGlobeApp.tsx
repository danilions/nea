import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

import EarthModel from './EarthModel';
import AirportMarkers from './AirportMarkers';
import FlightPaths from './FlightPaths';
import StarsBackground from './StarsBackground';
import AppModal from '../ui/AppModal';
import AppSearchBar from '../ui/AppSearchBar';
import GlobeNav from './GlobeNav';


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
interface Route {
  source: string;
  target: string;
  airline?: string;
  flight_number?: string;
  duration?: string;
  distance_km?: number;
  status?: string;
}

import type { FlightPathData } from './FlightPaths';

type GlobeSceneProps = {
  earthRadius: number;
  airports: Airport[];
  onSelectAirport: (airport: Airport) => void;
  flightRoutes: FlightPathData[];
  setTexturesLoaded: (v: boolean) => void;
  setDataError: (msg: string) => void;
};

// (Removed duplicate definition)
const GlobeScene: React.FC<GlobeSceneProps> = ({ earthRadius, airports, onSelectAirport, flightRoutes, setTexturesLoaded, setDataError }) => {
  // Manual texture loading with error handling
  const [mapTexture, setMapTexture] = useState<THREE.Texture | null>(null);
  const [bumpMapTexture, setBumpMapTexture] = useState<THREE.Texture | null>(null);
  const [specularMapTexture, setSpecularMapTexture] = useState<THREE.Texture | null>(null);
  const [cloudsTexture, setCloudsTexture] = useState<THREE.Texture | null>(null);
  const [nightLightsTexture, setNightLightsTexture] = useState<THREE.Texture | null>(null);
  const [textureErrors, setTextureErrors] = useState<string[]>([]);
  const [textureErrorDisplay, setTextureErrorDisplay] = useState<string|null>(null);
  const didSetLoaded = React.useRef(false);

  useEffect(() => {
    let loaded = 0;
    let errored = 0;
    const total = 5;
    const loader = new THREE.TextureLoader();
    const handleLoad = (name: string, setter: (t: THREE.Texture) => void) => (tex: THREE.Texture) => {
      setter(tex);
      loaded++;
      checkDone();
    };
    const handleError = (name: string) => () => {
      setTextureErrors(prev => [...prev, `[Globe] Texture load error: ${name}`]);
      setTextureErrorDisplay(`Texture failed to load: ${name}`);
      errored++;
      checkDone();
    };
    function checkDone() {
      if (loaded + errored === total && !didSetLoaded.current) {
        setTexturesLoaded(true);
        didSetLoaded.current = true;
      }
    }
    loader.load('/images/earth_map.jpg', handleLoad('earth_map', setMapTexture), undefined, handleError('earth_map'));
    loader.load('/images/earth_bump.jpg', handleLoad('earth_bump', setBumpMapTexture), undefined, handleError('earth_bump'));
    loader.load('/images/earth_specular.jpg', handleLoad('earth_specular', setSpecularMapTexture), undefined, handleError('earth_specular'));
    loader.load('/images/earth_clouds.png', handleLoad('earth_clouds', setCloudsTexture), undefined, handleError('earth_clouds'));
    loader.load('/images/earth_night.jpg', handleLoad('earth_night', setNightLightsTexture), undefined, handleError('earth_night'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('[Globe] Texture objects:', {
      mapTexture,
      bumpMapTexture,
      specularMapTexture,
      cloudsTexture,
      nightLightsTexture
    });
    if (textureErrors.length > 0) {
      console.warn('[Globe] Some textures failed to load:', textureErrors);
    }
    if (textureErrorDisplay) {
      setDataError(textureErrorDisplay);
    }
  }, [mapTexture, bumpMapTexture, specularMapTexture, cloudsTexture, nightLightsTexture, textureErrors, textureErrorDisplay, setDataError]);
  return (
    <>
      <ambientLight intensity={0.3} />
      <hemisphereLight intensity={0.5} groundColor={0x222233} color={'#eeeeff'} />
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={0.5} intensity={1.2} castShadow />
      <EarthModel
        radius={earthRadius}
        mapTexture={mapTexture}
        bumpMapTexture={bumpMapTexture}
        specularMapTexture={specularMapTexture}
        cloudsTexture={cloudsTexture}
        nightLightsTexture={nightLightsTexture}
      />
      <AirportMarkers
        airports={airports}
        radius={earthRadius}
        onSelect={onSelectAirport}
      />
      <FlightPaths flightRoutes={flightRoutes} />
      <StarsBackground numStars={10000} />
      <OrbitControls enablePan={false} enableZoom={true} minDistance={2.5} maxDistance={10} />
    </>
  );
};



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
interface Route {
  source: string;
  target: string;
  airline?: string;
  flight_number?: string;
  duration?: string;
  distance_km?: number;
  status?: string;
}
interface AirportsData {
  airports: Airport[];
  routes: Route[];
}

const GalacticGlobeApp = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { t } = useTranslation();
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);
  const [airportsDataState, setAirportsDataState] = useState<AirportsData | null>(null);
  const [filteredAirports, setFilteredAirports] = useState<Airport[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);
  const earthRadius = 2;

  // Textures will be loaded inside GlobeScene (inside Canvas)
  const [texturesLoaded, setTexturesLoaded] = useState(false);

  // Load airports and routes data dynamically
  useEffect(() => {
    setIsLoadingData(true);
    setDataError(null);
    (async () => {
      try {
        const response = await fetch('/airports-routes.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: AirportsData = await response.json();
        setAirportsDataState(data);
        setFilteredAirports(data.airports);
      } catch (error: any) {
        setDataError(t('globe.dataLoadError', { message: error?.message || 'Network error' }));
      } finally {
        setIsLoadingData(false);
      }
    })();
  }, [t]);

  // Filter airports based on search query
  useEffect(() => {
    if (!airportsDataState) return;
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = airportsDataState.airports.filter(airport =>
        airport.iata.toLowerCase().includes(lowerCaseQuery) ||
        airport.city.toLowerCase().includes(lowerCaseQuery) ||
        airport.country.toLowerCase().includes(lowerCaseQuery) ||
        airport.description?.toLowerCase().includes(lowerCaseQuery) ||
        airport.icao?.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredAirports(filtered);
    } else {
      setFilteredAirports(airportsDataState.airports);
    }
  }, [searchQuery, airportsDataState]);

  // Handle airport selection from globe
  const handleAirportSelect = useCallback((airport: Airport) => {
    setSelectedAirport(airport);
  }, []);

  // Handle search action
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setSelectedAirport(null);
  }, []);

  // Prepare routes for 3D visualization, memoized for performance
  const flightRoutes = React.useMemo(() => {
    if (!airportsDataState) return [];
    const routes = airportsDataState.routes.map((route: Route, index: number) => {
      const sourceAirport = airportsDataState.airports.find((a: Airport) => a.iata === route.source);
      const targetAirport = airportsDataState.airports.find((a: Airport) => a.iata === route.target);
      if (sourceAirport && targetAirport) {
        const phiStart = (90 - sourceAirport.lat) * (Math.PI / 180);
        const thetaStart = (sourceAirport.lng + 180) * (Math.PI / 180);
        const startVec = new THREE.Vector3(
          -earthRadius * Math.sin(phiStart) * Math.cos(thetaStart),
          earthRadius * Math.cos(phiStart),
          earthRadius * Math.sin(phiStart) * Math.sin(thetaStart)
        );
        const phiEnd = (90 - targetAirport.lat) * (Math.PI / 180);
        const thetaEnd = (targetAirport.lng + 180) * (Math.PI / 180);
        const endVec = new THREE.Vector3(
          -earthRadius * Math.sin(phiEnd) * Math.cos(thetaEnd),
          earthRadius * Math.cos(phiEnd),
          earthRadius * Math.sin(phiEnd) * Math.sin(thetaEnd)
        );
        return { start: startVec, end: endVec, routeInfo: route, index };
      }
      return null;
    }).filter((r): r is { start: THREE.Vector3; end: THREE.Vector3; routeInfo: Route; index: number } => r !== null);
    console.log('[Globe] flightRoutes prepared:', routes.length);
    return routes;
  }, [earthRadius, airportsDataState]);

  const showContent = !isLoadingData && !dataError && airportsDataState && texturesLoaded;

  if (isMobile) {
    return (
      <div className="relative w-full min-h-48 min-h-[40vh] flex items-center justify-center bg-black mx-auto shadow-2xl border-4 border-cyan-500/30 rounded-2xl">
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,255,255,0.18) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(16px)',
            zIndex: 1
          }}
          aria-hidden="true"
        />
        <Image
          src="/images/earth_night.jpg"
          alt={t('globe.mainTitle')}
          width={256}
          height={256}
          className="w-64 h-64 object-contain rounded-full shadow-cyan-400/40 shadow-2xl border-2 border-cyan-400 mx-auto"
          aria-hidden="true"
        />
      </div>
    );
  }
  return (
    <div className="relative w-full min-h-48 min-h-[40vh] bg-gradient-to-br from-gray-900 to-black text-white font-inter overflow-hidden mx-auto flex items-center justify-center shadow-2xl border-4 border-cyan-500/30 rounded-2xl">
      {/* Lens flare/glow effect behind globe */}
      <span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,255,0.18) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(32px)',
          zIndex: 1
        }}
        aria-hidden="true"
      />
      {/* Overlay Navigation Bar */}
      <GlobeNav />
      {/* Loading overlay */}
      {!showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-950 flex flex-col items-center justify-center z-50 text-blue-400 text-2xl font-bold"
          aria-live="polite"
          aria-busy={!showContent}
        >
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
          {isLoadingData ? t('globe.loadingData') : t('globe.loadingTextures')}
        </motion.div>
      )}

      {/* Error display */}
      {dataError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-red-900 bg-opacity-75 flex items-center justify-center z-50 text-white text-xl p-4 text-center"
          role="alert"
        >
          {typeof dataError === 'string' && dataError.startsWith('Texture failed to load:')
            ? dataError
            : t('globe.dataError', { error: dataError })}
          <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            {t('common.retry')}
          </button>
        </motion.div>
      )}

      {/* Main content (visible only when loaded) */}
      {showContent && (
        <>
          {/* Overlay UI elements */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="absolute top-0 left-0 w-full p-6 z-10 flex flex-col items-center space-y-4 pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center w-full"
            >
              <Image src="/images/logo.svg" alt={t('common.logoAlt')} width={64} height={64} style={{ marginBottom: '0.5rem' }} />
              {/* Color contrast: Ensure --color-primary and --color-background meet WCAG AA */}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold tracking-widest text-center drop-shadow-lg"
              style={{ pointerEvents: 'none' }}
            >
              {t('globe.mainTitle')}
            </motion.h1>
            <motion.div className="w-full flex justify-center">
              <AppSearchBar
                onSearch={handleSearch}
                placeholder={t('globe.searchPlaceholder')}
                ariaLabel={t('globe.searchAriaLabel')}
              />
            </motion.div>
          </motion.div>



          <Canvas
            camera={{ position: [0, 0, 5], fov: 60 }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          >
            <Suspense fallback={null}>
      <GlobeScene 
        earthRadius={earthRadius}
        airports={filteredAirports}
        onSelectAirport={handleAirportSelect}
        flightRoutes={flightRoutes}
        setTexturesLoaded={setTexturesLoaded}
        setDataError={setDataError}
      />
            </Suspense>
          </Canvas>


          <AppModal
            isOpen={!!selectedAirport}
            onClose={() => setSelectedAirport(null)}
            title={selectedAirport ? t('globe.airportDetailsTitle', { iata: selectedAirport.iata }) : ''}
          >
            {selectedAirport && (
              <div dir="ltr">
                <div className="mb-2"><strong>{t('airport.city')}:</strong> {selectedAirport.city}</div>
                <div className="mb-2"><strong>{t('airport.country')}:</strong> {selectedAirport.country}</div>
                <div className="mb-2"><strong>{t('airport.iataCode')}:</strong> {selectedAirport.iata}</div>
                <div className="mb-2"><strong>{t('airport.icaoCode')}:</strong> {selectedAirport.icao || '-'}</div>
                <div className="mb-2"><strong>{t('airport.coordinates')}:</strong> {selectedAirport.lat}, {selectedAirport.lng}</div>
                <div className="mb-2"><strong>{t('airport.timezone')}:</strong> {selectedAirport.timezone}</div>
                {selectedAirport.description && (
                  <div className="mb-2"><strong>{t('airport.description') || 'Description'}:</strong> {selectedAirport.description}</div>
                )}
                {/* Related routes */}
                {airportsDataState && (
                  <div className="mt-4">
                    <strong>{t('airport.relatedRoutes')}:</strong>
                    <ul className="list-disc ml-6 mt-1">
                      {airportsDataState.routes.filter(r => r.source === selectedAirport.iata || r.target === selectedAirport.iata).length === 0 && (
                        <li>{t('airport.noRelatedRoutes')}</li>
                      )}
                      {airportsDataState.routes.filter(r => r.source === selectedAirport.iata || r.target === selectedAirport.iata).map((route, idx) => (
                        <li key={idx}>
                          {t('route.flight')}: {route.flight_number || '-'} | {t('route.status')}: {t(`route.status.${route.status}`) || route.status || '-'} | {t('route.distance')}: {route.distance_km ? `${route.distance_km} km` : '-'}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </AppModal>
        </>
      )}
    </div>
  );
}

export default GalacticGlobeApp;
