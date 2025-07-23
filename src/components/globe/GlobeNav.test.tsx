import React from 'react';
import { render, screen } from '@testing-library/react';
import GlobeNav from './GlobeNav';

describe('GlobeNav', () => {
  it('renders navigation bar with correct role and items', () => {
    render(<GlobeNav />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    // Check for expected nav items
    expect(screen.getByText('דף הבית')).toBeInTheDocument();
    expect(screen.getByText('אודות')).toBeInTheDocument();
    expect(screen.getByText('שפה: עברית')).toBeInTheDocument();
    expect(screen.getByText('שפה: English')).toBeInTheDocument();
    expect(screen.getByText('צור קשר')).toBeInTheDocument();
  });
});
