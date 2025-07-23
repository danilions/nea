import Graph from 'graphology';
type GraphologyGraph = InstanceType<typeof Graph>;

export function createSampleGraph() {
  const graph = new Graph();
  for (let i = 0; i < 10; i++) {
    graph.addNode('n' + i, {
      label: `Node ${i}`,
      x: Math.cos((2 * Math.PI * i) / 10) * 10,
      y: Math.sin((2 * Math.PI * i) / 10) * 10,
    });
  }
  for (let i = 0; i < 9; i++) {
    graph.addEdge('n' + i, 'n' + (i + 1));
  }
  return graph;
}

// Async version for Next.js App Router: fetches real data from public/airports-routes.json
type Airport = {
  iata: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  timezone: string;
  icao?: string;
  gmt_offset?: number;
  description?: string;
};
type Route = {
  source: string;
  target: string;
  airline?: string;
  flight_number?: string;
  duration?: string;
  distance_km?: number;
  status?: string;
};
type AirportsData = { airports: Airport[]; routes: Route[] };

export async function fetchGraphDataAsync(): Promise<GraphologyGraph> {
  const Graph = (await import('graphology')).default;
  const graph = new Graph();
  let data: AirportsData;
  const url = '/airports-routes.json';
  try {
    console.log('[fetchGraphDataAsync] Fetching data from:', url);
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch airports data');
    const rawResponse = await res.text();
    console.log('[fetchGraphDataAsync] Raw response received:', rawResponse);
    try {
      data = JSON.parse(rawResponse);
    } catch (parseError) {
      console.error('[fetchGraphDataAsync] JSON.parse error:', parseError, 'Raw:', rawResponse);
      throw parseError;
    }
    console.log('[fetchGraphDataAsync] Parsed data:', data);
  } catch (e) {
    console.error('[fetchGraphDataAsync] Data loading or parsing failed:', e);
    return createSampleGraph();
  }
  // Log data transformation steps
  data.airports.forEach((airport, idx) => {
    if (!airport.iata || !airport.city || !airport.country || typeof airport.lat !== 'number' || typeof airport.lng !== 'number') {
      console.warn('[fetchGraphDataAsync] Malformed airport:', airport);
    }
    graph.addNode(airport.iata, {
      label: `${airport.city} (${airport.iata})`,
      city: airport.city,
      country: airport.country,
      lat: airport.lat,
      lng: airport.lng,
      x: airport.lng, // Sigma expects x and y as numbers
      y: airport.lat,
      size: 2 + Math.random(),
      color: `hsl(${(idx * 17) % 360}, 70%, 60%)`,
    });
  });
  data.routes.forEach((route, idx) => {
    if (!route.source || !route.target) {
      console.warn('[fetchGraphDataAsync] Malformed route:', route);
    }
    if (graph.hasNode(route.source) && graph.hasNode(route.target)) {
      graph.addEdge(route.source, route.target, {
        label: `${route.source}-${route.target}`,
        airline: route.airline,
        flight_number: route.flight_number,
        distance_km: route.distance_km,
        color: `hsl(${(idx * 23) % 360}, 60%, 50%)`,
        size: 1 + Math.random(),
      });
    }
  });
  return graph;
}

export async function fetchGraphData() {
  // Use real airport and route data from airports-routes.json
  const graph = new Graph();
  let data: AirportsData;
  const url = '/airports-routes.json';
  try {
    console.log('[fetchGraphData] Fetching data from:', url);
    const res = await fetch(url);
    const rawResponse = await res.text();
    console.log('[fetchGraphData] Raw response received:', rawResponse);
    try {
      data = JSON.parse(rawResponse);
    } catch (parseError) {
      console.error('[fetchGraphData] JSON.parse error:', parseError, 'Raw:', rawResponse);
      throw parseError;
    }
    console.log('[fetchGraphData] Parsed data:', data);
  } catch (e) {
    console.error('[fetchGraphData] Data loading or parsing failed:', e);
    // Fallback: return a small sample graph
    return createSampleGraph();
  }
  // Map airports to nodes
  data.airports.forEach((airport: Airport, idx: number) => {
    if (!airport.iata || !airport.city || !airport.country || typeof airport.lat !== 'number' || typeof airport.lng !== 'number') {
      console.warn('[fetchGraphData] Malformed airport:', airport);
    }
    graph.addNode(airport.iata, {
      label: `${airport.city} (${airport.iata})`,
      city: airport.city,
      country: airport.country,
      lat: airport.lat,
      lng: airport.lng,
      x: airport.lng, // Sigma expects x and y as numbers
      y: airport.lat,
      size: 2 + Math.random(),
      color: `hsl(${(idx * 17) % 360}, 70%, 60%)`,
    });
  });
  // Map routes to edges
  data.routes.forEach((route: Route, idx: number) => {
    if (!route.source || !route.target) {
      console.warn('[fetchGraphData] Malformed route:', route);
    }
    if (graph.hasNode(route.source) && graph.hasNode(route.target)) {
      graph.addEdge(route.source, route.target, {
        label: `${route.source}-${route.target}`,
        airline: route.airline,
        flight_number: route.flight_number,
        distance_km: route.distance_km,
        color: `hsl(${(idx * 23) % 360}, 60%, 50%)`,
        size: 1 + Math.random(),
      });
    }
  });
  return graph;
}
