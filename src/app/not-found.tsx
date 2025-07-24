import React from 'react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <span className="text-red-500 text-2xl font-bold mb-2">404</span>
      <span className="text-muted text-lg">Page not found</span>
    </div>
  );
}
