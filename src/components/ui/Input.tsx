import React from 'react';

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={props.className} />;
}

export function Label({ children, htmlFor, className }: { children: React.ReactNode; htmlFor?: string; className?: string }) {
  return <label htmlFor={htmlFor} className={className}>{children}</label>;
}
