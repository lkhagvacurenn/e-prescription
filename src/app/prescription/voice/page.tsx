'use client';

import { useEffect, useRef, useState } from 'react';
import { Typography, Button, Form, Input, Select, message, Row, Col } from 'antd';
import dayjs from 'dayjs';
import { parseVoiceText } from '@/utils/voiceParser';
import Lottie from 'lottie-react';
import voiceAnimation from '@/assets/voice-animation.json'; 

const { Option } = Select;

export default function VoicePrescriptionPage() {
  const [form] = Form.useForm();
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;

    if (!SpeechRecognition) {
      alert('Танай браузер дэмжихгүй байна.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'mn-MN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const voiceText = event.results[0][0].transcript;
      setText(voiceText);
      setIsListening(false);

      const parsed = parseVoiceText(voiceText);
      console.log('Parsed voice input:', parsed);
      form.setFieldsValue(parsed);
    };

    recognition.onerror = (e: any) => {
      console.error(e);
      setIsListening(false);
      message.error('Voice уншиж чадсангүй');
    };

    recognitionRef.current = recognition;
  }, [form]);

  const startListening = () => {
    if (recognitionRef.current) {
      setText('');
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const onFinish = (values: any) => {
    console.log('Илгээж буй жор:', values);
    message.success('Амжилттай хадгалагдлаа!');
  };

  return (
    <div style={{ padding: 24,display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography.Title level={3}>Дуу хоолойгоор жор бөглөх</Typography.Title>

      <div style={{ width: 200 }}>
        <Lottie
          animationData={voiceAnimation}
          loop={isListening}
          autoplay={isListening}
        />
      </div>

      <Button type="primary" onClick={startListening}>
        start
      </Button>

      {text && (
        <Typography.Paragraph style={{ marginTop: 24 }}>
          <strong>Сонссон текст:</strong> {text}
        </Typography.Paragraph>
      )}

      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{ date: dayjs() }}
        style={{ marginTop: 40 }}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item name="medicine" label="Эмийн нэр" rules={[{ required: true }]}>
              <Select placeholder="Эм сонгоно уу">
                <Option value="Paracetamol">Paracetamol</Option>
                <Option value="Ibuprofen">Ibuprofen</Option>
                <Option value="Amoxicillin">Amoxicillin</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="dose" label="Тун" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="frequency" label="Давтамж" rules={[{ required: true }]}>
              <Select>
                <Option value="once">Өдөрт 1 удаа</Option>
                <Option value="twice">Өдөрт 2 удаа</Option>
                <Option value="thrice">Өдөрт 3 удаа</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="duration" label="Хугацаа" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Жор хадгалах
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
