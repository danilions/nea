# 🌍 Dev Instructions — Globe Module Sync

## Task
Keep the D3-powered World Influence Map in full sync with:
- Live disinfo feed
- Country/group stats
- Theming & Tailwind tokens

## Workflow
1. Use `world.geo.json` from `/public/data`
2. Keep the data structure flat and sorted
3. Only import clean, validated GeoJSON
4. Bind Tailwind tokens to fill/stroke per region
5. Use Framer Motion for on-hover pop (SVG zoom)
6. Update region styles via module-scoped CSS

## Data Updates
Pull from Azure (storage/blob or API endpoint) using:
```ts
const data = await fetch('/api/globe').then(res => res.json())