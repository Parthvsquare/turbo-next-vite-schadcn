import { userAuth } from '@/store';
import { App, Button, Card, Form, Input, Skeleton, Typography } from 'antd';
import { useAtom } from 'jotai';
import React, { Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import z from 'zod';

const { Title } = Typography;

export const formSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8),
});

function Login() {
  const { message } = App.useApp();
  const [, setAuth] = useAtom(userAuth);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onFinishFailed = (errorInfo: any) => {
    message.error('Error while login!');
  };

  const onFinish = async (value: Record<string, string>) => {};

  return (
    <Suspense fallback={<Skeleton />}>
      <Card
        style={{
          margin: '24px 16px',
          padding: 24,
          background: 'white',
        }}
        title={<Title level={2}>Login</Title>}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          initialValues={{ remember: true }}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Suspense>
  );
}

export default Login;
