import React, { forwardRef } from 'react';

interface Verse {
  verse_key: string;
  text_uthmani: string;
  translation: string;
  chapterName: string;
}

interface QuoteCardProps {
  verse: Verse | null;
}

const QuoteCard = forwardRef<HTMLDivElement, QuoteCardProps>(({ verse }, ref) => {
  if (!verse) {
    return <div ref={ref}></div>;
  }

  return (
    <div
      ref={ref}
      className="bg-white rounded-lg shadow-xl p-8 text-center w-full max-w-md"
      style={{ fontFamily: 'var(--font-inter)' }}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Surah {verse.chapterName}</h2>
      <p className="mb-4 text-sm text-gray-600">{verse.verse_key.replace(':', ' : ')}</p>
      <p
        className="text-3xl leading-relaxed text-right mb-4 text-gray-800"
        style={{ fontFamily: 'var(--font-quran)' }}
      >
        {verse.text_uthmani}
      </p>
      <p className="text-gray-800 text-base italic">"{verse.translation}"</p>
      <p className="text-xs text-gray-500 mt-2">Dibagikan dari Ayat Pilihan</p>
    </div>
  );
});

QuoteCard.displayName = 'QuoteCard';

export default QuoteCard;