import { App, Card, Space, Typography } from 'antd';

const { Text } = Typography;

function Home() {
  const { notification, modal } = App.useApp();

  return (
    <Space>
      <Card title="Coins Generated" style={{ width: 300 }}>
        <div>Home</div>
      </Card>
    </Space>
  );
}

export default Home;
