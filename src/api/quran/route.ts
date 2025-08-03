// File: src/app/api/quran/route.ts

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const surah = searchParams.get('surah');
  const ayat = searchParams.get('ayat');

  if (!surah || !ayat) {
    return NextResponse.json({ error: 'Nomor surah dan ayat diperlukan' }, { status: 400 });
  }

  try {
    // 'Resepsionis' kita sekarang yang memanggil API luar
    const mainApiResponse = await fetch(`https://quran-api-id.vercel.app/surahs/${surah}/verses/${ayat}`);
    
    if (!mainApiResponse.ok) {
      throw new Error(`API call failed with status: ${mainApiResponse.status}`);
    }
    
    const data = await mainApiResponse.json();
    
    // Kirim kembali datanya ke frontend kita
    return NextResponse.json(data);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error("API Route Error:", errorMessage);
    return NextResponse.json({ error: 'Gagal mengambil data dari API eksternal', details: errorMessage }, { status: 500 });
  }
}