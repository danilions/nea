import React from 'react';
export function Button({
  children,
  'aria-label': ariaLabel,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 'aria-label'?: string }) {
  return (
    <button
      className={
        `py-4 px-8 text-xl bg-cyan-500/80 hover:bg-cyan-400 rounded-full shadow-xl text-white font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2`
        + (props.className ? ` ${props.className}` : '')
      }
      aria-label={ariaLabel || (typeof children === 'string' ? children : 'Button')}
      {...props}
    >
      {children}
    </button>
  );
}
