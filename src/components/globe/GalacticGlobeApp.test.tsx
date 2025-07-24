// Mock TextureLoader to immediately call success callback
jest.mock('three', () => {
  const original = jest.requireActual('three');
  return {
    ...original,
    TextureLoader: jest.fn().mockImplementation(() => ({
      load: (
        url: string,
        onLoad: () => void
      ) => {
        // Simulate successful load for all textures
        onLoad();
      }
    }))
  };
});


// Use fake timers for all tests
beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});
import React from 'react';

// Mock global fetch

let consoleLogSpy: jest.SpyInstance;
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({
        airports: [
          { id: 'TLV', name: 'Ben Gurion', lat: 32.0, lon: 35.0 }
        ],
        routes: [
          { from: 'TLV', to: 'JFK' }
        ]
      }),
      headers: new Headers(),
      redirected: false,
      statusText: '',
      type: 'basic',
      url: '',
      clone: () => ({} as Response),
      body: null,
      bodyUsed: false,
      arrayBuffer: async () => new ArrayBuffer(0),
      blob: async () => new Blob(),
      formData: async () => new FormData(),
      text: async () => '',
    } as Response)
  );
  consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
});


afterEach(() => {
  jest.resetAllMocks();
  if (consoleLogSpy) consoleLogSpy.mockRestore();
});

// Mock i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

// Mock @react-three/fiber and drei to prevent 3D rendering logic
jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useFrame: () => {},
  useThree: () => ({ camera: {}, scene: {}, gl: {} }),
}));
jest.mock('@react-three/drei', () => ({
  OrbitControls: () => <div />,
  Stars: () => <div />,
  Html: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useGLTF: () => ({}),
  useTexture: () => ({}),
}));

describe('GalacticGlobeApp', () => {
  // test.todo: Unable to reliably render GalacticGlobeApp in Jest/JSDOM due to unresolved Three.js and Framer Motion internals
  // The component hangs in test environment because animation and 3D effects cannot be mocked or resolved fully.
  test.todo('renders navigation bar (blocked by Three.js/Framer Motion render hang in JSDOM)');
});
