// File: src/app/QuoteCard.tsx

import React, { forwardRef } from 'react';

// Mendefinisikan tipe data yang akan diterima oleh komponen ini
type VerseData = {
  verse_key: string;
  text_uthmani: string;
  translation: string;
  chapterName: string;
};

type QuoteCardProps = {
  verse: VerseData | null;
};

// Kita menggunakan forwardRef agar bisa "memegang" elemen ini dari luar
const QuoteCard = forwardRef<HTMLDivElement, QuoteCardProps>(({ verse }, ref) => {
  if (!verse) return null;

  return (
    // Ini adalah komponen yang akan kita "potret"
    // Kita beri ukuran spesifik agar pas untuk Instagram Story / Status WhatsApp
    <div ref={ref} className="bg-white p-8 border border-gray-200" style={{ width: '1080px', height: '1920px' }}>
      <div className="flex flex-col justify-center items-center h-full text-center">
        <h2 className="text-6xl font-bold text-gray-800 mb-4">{verse.chapterName}</h2>
        <p className="mb-8 text-4xl font-semibold text-gray-700">{verse.verse_key.replace(':', ' : ')}</p>

        <p 
          className="text-8xl leading-relaxed text-right dir-rtl mb-12" 
          style={{ fontFamily: 'var(--font-quran)' }}
        >
          {verse.text_uthmani}
        </p>

        <p className="text-4xl text-gray-600 px-12">
          "{verse.translation}"
        </p>

        <div className="absolute bottom-8">
          <p className="text-2xl text-gray-400">Dibagikan dari AyatPilihan.com (Nama Web Anda)</p>
        </div>
      </div>
    </div>
  );
});

QuoteCard.displayName = 'QuoteCard';
export default QuoteCard;