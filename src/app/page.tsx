// File: src/app/page.tsx
// Kode final yang menggabungkan semua fitur + deteksi browser Instagram.

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import * as htmlToImage from 'html-to-image';
import QuoteCard from './QuoteCard';
import toast from 'react-hot-toast';
import Link from 'next/link';

// Tipe data final yang kita inginkan
export type VerseData = {
  surah: {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
  };
  ayat: {
    nomor: number;
    teksArab: string;
    teksLatin: string;
    terjemahan: string;
    tafsir: string;
    audio: string | null;
  };
};

// Cache untuk menyimpan informasi surah (jumlah ayat, nama, dll)
let chapterInfoCache: any[] = [];
async function getChapterInfo() {
  if (chapterInfoCache.length > 0) return chapterInfoCache;
  try {
    const response = await fetch('https://api.quran.com/api/v4/chapters?language=id');
    if (!response.ok) throw new Error('Gagal memuat info surah');
    const data = await response.json();
    chapterInfoCache = data.chapters;
    return chapterInfoCache;
  } catch (error) {
    console.error(error);
    toast.error("Gagal menyambung ke server data surah.");
    return [];
  }
}

export default function HomePage() {
  const [verse, setVerse] = useState<VerseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [showTafsir, setShowTafsir] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInstagramWarning, setShowInstagramWarning] = useState(false); // State untuk Notifikasi
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const quoteCardRef = useRef<HTMLDivElement | null>(null);

  // Fungsi utama untuk mengambil data ayat dari quran.com
  const fetchVerse = useCallback(async (surah: number