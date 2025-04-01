import { List, Typography, Space } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const data = [
  { name: 'Paracetamol', date: '2025.03.30' },
  { name: 'Ibuprofen', date: '2025.03.28' },
];

export default function PrescriptionHistory() {
  return (
    <div style={{ padding: '0 24px' }}>
      <Typography.Title level={4}>
        <Space>
          <ClockCircleOutlined />
          Өмнөх жорууд
        </Space>
      </Typography.Title>

      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.name}
              description={`Огноо: ${item.date}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
