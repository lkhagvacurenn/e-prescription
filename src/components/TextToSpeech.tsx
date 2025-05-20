'use client';

import { useState } from 'react';
import styles from '@/styles/patience.module.css';

// API-аас WAV файл татах функц
async function fetchWavFile(text: string): Promise<ArrayBuffer> {
  try {
    const encodedText = encodeURIComponent(text);
    const response = await fetch(`http://64.119.31.61:6444/synthesize_raw?text=${encodedText}`, {
      method: 'GET',
    });

    if (!response.ok) throw new Error(`API хүсэлт амжилтгүй: ${response.status}`);
    return await response.arrayBuffer();
  } catch (error) {
    console.error('WAV файл татахад алдаа:', error);
    throw error;
  }
}

interface TextToSpeechProps {
  text: string; 
}

export default function TextToSpeech({ text }: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContext = typeof window !== 'undefined' ? new AudioContext() : null;

  const handlePlayAudio = async () => {
    if (!audioContext || isPlaying) return;

    try {
      setIsPlaying(true);
      const wavBuffer = await fetchWavFile(text);

      const audioBuffer = await audioContext.decodeAudioData(wavBuffer);
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start(0);

      source.onended = () => setIsPlaying(false);
    } catch (error) {
      setIsPlaying(false);
      alert('Аудио тоглуулахад алдаа гарлаа');
    }
  };

  return (
    <button
      className={`${styles.speakerBtn} ${isPlaying ? styles.playing : ''}`}
      onClick={handlePlayAudio}
      disabled={isPlaying}
      aria-label="Жорыг унших"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={styles.speakerIcon}
      >
        <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905C1.507 10.637 1.507 13.012 1.848 14.239c.342 1.241 1.519 1.905 2.66 1.905h1.93l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
        <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
      </svg>
    </button>
  );
}
