// File: src/app/ClientLayout.tsx
'use client';
import React from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const forceSolidStyle = {
    '--tw-bg-opacity': '1',
    '--tw-text-opacity': '1',
    '--tw-border-opacity': '1',
  };

  return (
    <div style={forceSolidStyle as React.CSSProperties}>
      {children}
    </div>
  );
}