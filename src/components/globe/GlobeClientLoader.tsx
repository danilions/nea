'use client';
import dynamic from 'next/dynamic';
const GalacticGlobeApp = dynamic(() => import('./GalacticGlobeApp'), { ssr: false });
export default GalacticGlobeApp;
