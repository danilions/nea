import React from 'react';

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`pt-[var(--space-xs)] ${className ?? ''}`}>
      {children}
    </div>
  );
}
