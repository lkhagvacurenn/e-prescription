export function parseSentence(text: string) {
  const medicineMatch = text.match(/(парацетемол|эбо пропин|витамин)/i);

  const words = text.split(/\s+/).map(convertMongolianNumber);
  const normalizedText = words.join(' ');

  const doseMatch = normalizedText.match(/(\d+)\s*(мг|мили|милиграмм)?/i);
  const frequencyMatch = normalizedText.match(/(\d+)\s*удаа/i);
  const durationMatch = normalizedText.match(/(\d+)\s*(хоног|өдөр)/i);


  const frequency = frequencyMatch?.[1] === '3' ? 'thrice'
                   : frequencyMatch?.[1] === '2' ? 'twice'
                   : frequencyMatch?.[1] === '1' ? 'once'
                   : '';

  return {
    medicine: medicineMatch?.[1] || '',
    dose: doseMatch ? `${doseMatch[1]}mg` : '',
    frequency,
    duration: durationMatch ? `${durationMatch[1]} хоног` : '',
    usage: 'Хоолны дараа',
  };

  function convertMongolianNumber(word: string): string {
    const map: Record<string, string> = {
      'нэг': '1',
      'хоёр': '2',
      'гурав': '3',
      'дөрөв': '4',
      'тав': '5',
      'зургаа': '6',
      'долоо': '7',
      'найм': '8',
      'ес': '9',
      'арав': '10',
    };
    return map[word.trim().toLowerCase()] || word;
  }
  
}
