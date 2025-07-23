import React from 'react';
export default function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span className="relative group">
      {children}
      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-[var(--color-text)] text-[var(--color-background)] text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        {label}
      </span>
    </span>
  );
}
