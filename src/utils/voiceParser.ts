// Энгийн логик дээр суурилсан parser

export function parseVoiceText(text: string) {
    const result: {
      medicine?: string;
      dose?: string;
      frequency?: string;
      duration?: string;
    } = {};
    
  
    // Эмийн нэр (mock list)
    const medicines = ['Paracetamol', 'Ibuprofen', 'Amoxicillin'];
    const doseRegex = /(\d{2,4})\s*(mg|мг|миллиграмм)/i;
    const durationRegex = /(7|7 хоног|долоон хоног|10 хоног|арав хоног)/i;
    const frequencyKeywords = [
      { keyword: 'өдөрт 1 удаа', value: 'once' },
      { keyword: 'өдөрт 2 удаа', value: 'twice' },
      { keyword: 'өдөрт 3 удаа', value: 'thrice' },
    ];
  
    // Эмийн нэр олох
    for (const med of medicines) {
      if (text.toLowerCase().includes(med.toLowerCase())) {
        result.medicine = med;
      }
    }
  
    // Тун
    const doseMatch = text.match(doseRegex);
    if (doseMatch) {
      result.dose = `${doseMatch[1]}mg`;
    }
  
    // Давтамж
    for (const freq of frequencyKeywords) {
      if (text.toLowerCase().includes(freq.keyword)) {
        result.frequency = freq.value;
      }
    }
  
    // Хугацаа
    const durationMatch = text.match(durationRegex);
    if (durationMatch) {
      result.duration = durationMatch[0];
    }
  
    return result;
  }
  