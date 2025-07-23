
import React from 'react';
export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--border-radius)] p-[var(--space-md)] shadow">
      {children}
    </div>
  );
}

export * from './CardHeader';
export * from './CardTitle';
export * from './CardDescription';
export * from './CardContent';
