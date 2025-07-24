import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></span>
      <span className="ml-4 text-primary text-lg">Loading...</span>
    </div>
  );
}
