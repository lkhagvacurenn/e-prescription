'use client';

import { useState } from 'react';
import styles from '@/styles/patience.module.css';

// Эмийн мэдээллийн интерфэйс
interface Medicine {
  name: string;
  defaultDose: string;
  defaultFrequency: string;
  defaultDuration: string;
  instructions: string;
}

// Тоог Монгол хэлний Кирилл текст болгох функц
function numberToMongolianText(numberStr: string): string {
  // Тоог ялгах (жишээ: "500мг" → "500")
  const numMatch = numberStr.match(/^\d+/);
  if (!numMatch) return numberStr; // Тоо байхгүй бол хэвээр буцаах

  const num = parseInt(numMatch[0], 10);
  const suffix = numberStr.replace(/^\d+/, ''); // Жишээ: "мг"

  // Тооны хязгаар (0-9999 хүртэл энгийн логикоор)
  if (num < 0 || num > 9999) return numberStr; // Хэт том тоог хэвээр буцаах

  // Монгол хэлний тооны нэршил
  const units = ['', 'нэг', 'хоёр', 'гурав', 'дөрөв', 'тав', 'зургаа', 'долоо', 'найм', 'ес'];
  const tens = ['', 'арав', 'хорь', 'гуч', 'дөч', 'тавь', 'жар', 'дал', 'ная', 'ер'];
  const hundreds = ['', 'зуу', 'хоёр зуу', 'гурван зуу', 'дөрвөн зуу', 'таван зуу', 'зургаан зуу', 'долоон зуу', 'найман зуу', 'есөн зуу'];
  const thousands = ['', 'мянга', 'хоёр мянга', 'гурван мянга', 'дөрвөн мянга', 'таван мянга', 'зургаан мянга', 'долоон мянга', 'найман мянга', 'есөн мянга'];

  let result = '';

  // Мянгат
  const thousand = Math.floor(num / 1000);
  if (thousand > 0) {
    result += thousands[thousand] + ' ';
  }

  // Зуут
  const hundred = Math.floor((num % 1000) / 100);
  if (hundred > 0) {
    result += hundreds[hundred] + ' ';
  }

  // Арав ба нэгж
  const tenAndUnit = num % 100;
  if (tenAndUnit >= 10 && tenAndUnit < 20) {
    // Онцгой тоо (11-19)
    const specialTeens = ['', 'арван нэг', 'арван хоёр', 'арван гурав', 'арван дөрөв', 'арван тав', 'арван зургаа', 'арван долоо', 'арван найм', 'арван ес'];
    result += specialTeens[tenAndUnit - 10] + ' ';
  } else {
    const ten = Math.floor(tenAndUnit / 10);
    const unit = tenAndUnit % 10;
    if (ten > 0) {
      result += tens[ten] + ' ';
    }
    if (unit > 0) {
      result += units[unit] + ' ';
    }
  }

  // Хэрэв тоо 0 бол
  if (num === 0) {
    result = 'тэг ';
  }

  return result.trim() + suffix; // Жишээ: "таван зуу миллиграмм"
}

// Талбарыг боловсруулах функц
function processMedicineFields(medicine: Medicine): string {
  const fields = [
    `Эмийн нэр: ${medicine.name}`,
    `Тун: ${numberToMongolianText(medicine.defaultDose)}`,
    `Давтамж: ${numberToMongolianText(medicine.defaultFrequency)}`,
    `Хугацаа: ${numberToMongolianText(medicine.defaultDuration)}`,
    `Заавар: ${medicine.instructions}`,
  ];
  return fields.join(', ');
}

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
  medicine: Medicine; // Бүх эмийн талбарууд
}

export default function TextToSpeech({ medicine }: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContext = typeof window !== 'undefined' ? new AudioContext() : null;

  const handlePlayAudio = async () => {
    if (!audioContext || isPlaying) return;

    try {
      setIsPlaying(true);
      // Бүх талбарыг боловсруулж, тоог Кирилл текст болгох
      const text = processMedicineFields(medicine);
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
      aria-label={`Унших: ${medicine.name}`}
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