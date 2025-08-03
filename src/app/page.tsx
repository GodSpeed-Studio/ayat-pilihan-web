'use client'; 

import { useState, useRef, useEffect } from 'react';

type Verse = {
  verse_key: string;
  text_uthmani: string;
  translation: string;
  audioUrl: string | null;
  chapterName: string;
  tafsir: string;
  transliteration: string; 
};

export default function HomePage() {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [currentVerseNumber, setCurrentVerseNumber] = useState<{surah: number, ayat: number} | null>(null);
  const [showTafsir, setShowTafsir] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fetchSpecificVerse = async (surahNumber: number, ayatNumber: number) => {
    if (!surahNumber || !ayatNumber) return;
    
    setIsNavigating(true);
    if(audioRef.current) audioRef.current.pause();
    setIsPlaying(false);
    setIsAudioLoading(false);
    setShowTafsir(false);

    try {
      // Panggil "RESEPSIONIS" kita di /api/quran
      const response = await fetch(`/api/quran?surah=${surahNumber}&ayat=${ayatNumber}`);
      const data = await response.json();
  
      if (data.code === 200) {
        const verseData = data.data;
        setVerse({
          verse_key: `${verseData.surah.number}:${verseData.number.inSurah}`,
          text_uthmani: verseData.text.arab,
          translation: verseData.translation.id,
          audioUrl: verseData.audio.primary,
          chapterName: verseData.surah.name.transliteration.id,
          tafsir: verseData.tafsir.id.kemenag.short,
          transliteration: verseData.transliteration.id,
        });
        setCurrentVerseNumber({ surah: verseData.surah.number, ayat: verseData.number.inSurah });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("TERJADI ERROR:", error);
      alert("Gagal mengambil data. Silakan cek konsol browser.");
    }
    setIsNavigating(false);
  };

  const fetchRandomVerse = async () => {
    setIsLoading(true);
    const randomSurah = Math.floor(Math.random() * 114) + 1;
    
    const surahInfoResponse = await fetch(`https://quran-api-id.vercel.app/surahs/${randomSurah}`);
    const surahInfoData = await surahInfoResponse.json();
    const totalAyat = surahInfoData.data.numberOfVerses;

    const randomAyat = Math.floor(Math.random() * totalAyat) + 1;
    
    await fetchSpecificVerse(randomSurah, randomAyat);
    setIsLoading(false);
  };

  const handlePrevious = () => {
    if (currentVerseNumber && (currentVerseNumber.ayat > 1)) {
      fetchSpecificVerse(currentVerseNumber.surah, currentVerseNumber.ayat - 1);
    }
  };

  const handleNext = async () => {
    if (currentVerseNumber) {
      const surahInfoResponse = await fetch(`https://quran-api-id.vercel.app/surahs/${currentVerseNumber.surah}`);
      const surahInfoData = await surahInfoResponse.json();
      const totalAyat = surahInfoData.data.numberOfVerses;
      
      if (currentVerseNumber.ayat < totalAyat) {
        fetchSpecificVerse(currentVerseNumber.surah, currentVerseNumber.ayat + 1);
      }
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      setIsAudioLoading(true);
      audioRef.current?.play();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handlePlay = () => { setIsPlaying(true); setIsAudioLoading(false); };
      const handlePause = () => setIsPlaying(false);
      const handleWaiting = () => setIsAudioLoading(true);

      audio.addEventListener('playing', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handlePause);
      audio.addEventListener('waiting', handleWaiting);

      return () => {
        audio.removeEventListener('playing', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handlePause);
        audio.removeEventListener('waiting', handleWaiting);
      };
    }
  }, [verse]);


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center bg-gray-50">
      
      {verse && (
        <div className="mb-8 max-w-2xl w-full">
          <div className="flex justify-between mb-4">
            <button onClick={handlePrevious} disabled={isNavigating || (currentVerseNumber && currentVerseNumber.ayat === 1 && currentVerseNumber.surah === 1)} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50">‹ Ayat Sebelumnya</button>
            <button onClick={handleNext} disabled={isNavigating} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50">Ayat Berikutnya ›</button>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-xl text-left">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{verse.chapterName}</h2>
              <p className="mb-4 text-lg font-semibold text-gray-700">{verse.verse_key}</p>
            </div>
            
            {verse.audioUrl && <audio ref={audioRef} src={verse.audioUrl} preload="auto" />}

            <p 
              className="text-4xl leading-relaxed text-right dir-rtl mb-4" 
              style={{ fontFamily: 'var(--font-quran)' }}
            >
              {verse.text_uthmani}
            </p>
            
            <p className="text-gray-500 italic mb-6">
              {verse.transliteration}
            </p>
            
            <p className="text-gray-800">{verse.translation}</p>

            <div className="mt-6 pt-4 border-t">
              <button 
                onClick={() => setShowTafsir(!showTafsir)} 
                className="text-sm text-blue-600 hover:underline"
              >
                {showTafsir ? 'Sembunyikan Tafsir' : 'Tampilkan Tafsir'}
              </button>
              
              {showTafsir && (
                <div className="mt-2 p-4 bg-gray-100 rounded-lg">
                  <h3 className="font-bold mb-2">Tafsir (Kemenag Ringkas):</h3>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{verse.tafsir}</p>
                </div>
              )}
            </div>

            <div className="mt-4 text-center">
              {verse.audioUrl ? (
                <button 
                  onClick={handlePlayPause}
                  disabled={isAudioLoading}
                  className="rounded-full bg-green-500 px-6 py-2 font-semibold text-white transition-all duration-200 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-wait"
                >
                  {isAudioLoading ? 'Memuat Audio...' : isPlaying ? '⏹️ Hentikan' : '▶️ Dengarkan'}
                </button>
              ) : (
                <button 
                  disabled 
                  className="rounded-full bg-gray-300 px-6 py-2 font-semibold text-gray-500 cursor-not-allowed"
                >
                  Audio tidak tersedia
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
      {!verse && (
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Ayat Pilihan
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Temukan petunjuk dan ketenangan dalam Al-Qur'an.
          </p>
        </div>
      )}

      <button 
        onClick={fetchRandomVerse}
        disabled={isLoading}
        className="rounded-lg bg-blue-600 px-8 py-4 text-xl font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:scale-100"
      >
        {isLoading ? 'Mencari...' : 'CARI AYAT ACAK'}
      </button>

    </main>
  );
}