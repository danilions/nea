// src/components/watchlist/WatchlistPanel.tsx
import React from 'react';
import Image from 'next/image';

export interface WatchlistItem {
  id: string;
  name: string;
  type: string;
  image: string;
}

interface WatchlistPanelProps {
  items: WatchlistItem[];
  onRemove: (id: string) => void;
}

export const WatchlistPanel: React.FC<WatchlistPanelProps> = ({ items, onRemove }) => {
  return (
    <div className="fixed right-4 bottom-4 w-80 bg-surface shadow-lg rounded-lg p-4 z-40">
      <h3 className="font-bold text-lg mb-2">My Watchlist</h3>
      <ul className="space-y-2">
        {items.length === 0 && <li className="text-muted">No saved actors.</li>}
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3 bg-background rounded p-2 shadow-sm">
            <Image src={item.image} alt={item.name} width={40} height={40} className="object-cover rounded" />
            {/* Color contrast: Ensure background and text-muted meet accessibility */}
            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              <div className="text-xs text-muted">{item.type}</div>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="text-red-500 hover:text-red-700 text-sm font-bold px-2"
              aria-label={`Remove ${item.name}`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
