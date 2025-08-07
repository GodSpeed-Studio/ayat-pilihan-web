// Lokasi File: src/app/ClientLayout.tsx
'use client';
import React from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  // Ini adalah style "pemaksa" kita
  const forceSolidStyle: React.CSSProperties = {
    '--tw-bg-opacity': '1',
    '--tw-text-opacity': '1',
    '--tw-border-opacity': '1',
  };

  // Komponen ini akan membungkus semua halaman kita dengan style di atas
  return (
    <div style={forceSolidStyle}>
      {children}
    </div>
  );
}