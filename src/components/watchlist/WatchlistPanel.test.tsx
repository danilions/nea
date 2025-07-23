import React from 'react';
import { render, screen } from '@testing-library/react';
import { WatchlistPanel } from './WatchlistPanel';

describe('WatchlistPanel', () => {
  it('renders watchlist items', () => {
    const items = [
      { id: '1', name: 'דמות 1', type: 'ארגון', image: '/icon.png' },
      { id: '2', name: 'דמות 2', type: 'פרופיל', image: '/icon.png' },
    ];
    render(<WatchlistPanel items={items} onRemove={() => {}} />);
    expect(screen.getByText('דמות 1')).toBeInTheDocument();
    expect(screen.getByText('דמות 2')).toBeInTheDocument();
  });
});
