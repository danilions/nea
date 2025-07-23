import React from 'react';

export function CardHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-[var(--color-border)] pb-[var(--space-xs)] mb-[var(--space-xs)]">
      {children}
    </div>
  );
}
