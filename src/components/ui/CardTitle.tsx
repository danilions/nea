import React from 'react';

export function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-semibold text-[var(--color-primary)]">
      {children}
    </h3>
  );
}
