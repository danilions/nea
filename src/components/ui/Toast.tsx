import React from 'react';
export default function Toast({
  message,
  type = 'info',
}: {
  message: string;
  type?: 'info' | 'success' | 'error';
}) {
  const color =
    type === 'success'
      ? 'bg-green-500'
      : type === 'error'
        ? 'bg-red-500'
        : 'bg-[var(--color-primary)]';
  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-2 text-[var(--color-background)] rounded-[var(--border-radius)] shadow ${color}`}
    >
      {message}
    </div>
  );
}
