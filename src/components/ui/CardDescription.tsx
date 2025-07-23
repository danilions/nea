import React from 'react';

export function CardDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-[var(--color-muted)]">
      {children}
    </p>
  );
}
