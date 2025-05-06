export function parseSentence(text: string) {
  const medicineMatch = text.match(/(парацетемол|эбо пропин|витамин)/i);
  const doseMatch = text.match(/(\d+)\s*(мг|мили|милиграмм)?/i);
  const frequencyMatch = text.match(/(\d+)\s*удаа/i);
  const durationMatch = text.match(/(\d+)\s*(хоног|өдөр)/i);

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
}
