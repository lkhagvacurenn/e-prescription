'use client';

import { useEffect, useRef, useState } from 'react';
import {Typography,Button,Form,message} from 'antd';
import Lottie from 'lottie-react';
import voiceAnimation from '@/assets/voice-animation.json';
import PrescriptionForm from '@/components/PrescriptionForm';
import {parseSentence} from '@/utils/parseSentence';

export default function VoicePrescriptionPage() {
  const [form] = Form.useForm();
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState('');
  const recognitionRef = useRef<any>(null);

  // 🔁 Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;

    if (!SpeechRecognition) {
      alert('Танай браузер дэмжихгүй байна.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'mn-MN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = async (event: any) => {
      const voiceText = event.results[0][0].transcript;
      setText(voiceText);
      setIsListening(false);
      
      handleVoiceCommand(voiceText);

      const parsed = await callVoiceAPI(voiceText);
      if (parsed) {
        console.log('Parsed from API:', parsed);
        form.setFieldsValue(parsed);
      }
    };

    recognition.onerror = (e: any) => {
      console.error(e);
      setIsListening(false);
      message.error('Дуу танихад алдаа гарлаа');
    };

    recognitionRef.current = recognition;
  }, [form]);

  // 📡 Call Transcription API
  const callVoiceAPI = async (text: string) => {
    try {
      const response = await fetch('http://64.119.31.61:6444/transcribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      return data; // Expects fields: { medicine, dose, frequency, duration }
    } catch (err) {
      console.error(err);
      message.error('Сервертэй холбогдож чадсангүй.');
      return null;
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setText('');
      setIsListening(true);
      recognitionRef.current.start();
    }
  };


  const handleVoiceCommand = (voiceText: string) => {
    if (voiceText.toLowerCase().includes('жор нэм')) {
      const cleaned = voiceText.replace(/жор нэм/i, '').trim();
      const parsed = parseSentence(cleaned);
      const current = form.getFieldValue('medicines') || [];
      form.setFieldsValue({ medicines: [...current, parsed] });
      message.success('Эм амжилттай нэмэгдлээ!');
    } else {
      // fallback: just fill first item
      const parsed = parseSentence(voiceText);
      form.setFieldsValue({ medicines: [parsed] });
      message.success('Мэдээлэл бөглөгдлөө');
    }
  };



  const onFinish = (values: any) => {
    console.log('Илгээж буй жор:', values);
    message.success('Амжилттай хадгалагдлаа!');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography.Title level={3}>Дуу хоолойгоор жор бөглөх</Typography.Title>

      <div style={{ width: 200 }}>
        <Lottie
          animationData={voiceAnimation}
          loop={isListening}
          autoplay={isListening}
        />
      </div>

      <Button type="primary" onClick={startListening} style={{marginBottom: 24}}>
        Start Listening
      </Button>

      {text && (
        <Typography.Paragraph style={{ marginTop: 24 }}>
          <strong>Сонссон текст:</strong> {text}
        </Typography.Paragraph>
      )}

      <PrescriptionForm form={form} onFinish={onFinish} />

    </div>
  );
}
