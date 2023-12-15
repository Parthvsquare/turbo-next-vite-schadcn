import packageJson from '../../../package.json';
import { userAuth } from '@/store';
import { UserOutlined } from '@ant-design/icons';
import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined } from '@ant-design/icons';
import { App, Button, Dropdown, MenuProps, theme, Typography } from 'antd';
import Avatar from 'antd/es/avatar/avatar';
import { Header } from 'antd/es/layout/layout';
import { useAtom } from 'jotai';
import './index.css';
import React, { createElement, useEffect, useState } from 'react';

const { Text } = Typography;

interface IProps {
  collapsed: boolean;
  setCollapsed: (args: boolean) => void;
}

function AppHeader({ collapsed, setCollapsed }: IProps) {
  const {
    token: { colorFill },
  } = theme.useToken();
  const [useAuth, setUserAuth] = useAtom(userAuth);
  const [userName, setUserName] = useState('Loading....');
  const [loading, setLoading] = useState(false);
  const { notification } = App.useApp();

  const items: MenuProps['items'] = [
    {
      key: 'signOut',
      label: (
        <Button loading={loading} disabled={!useAuth} danger icon={<LogoutOutlined />}>
          Sign Out
        </Button>
      ),
      disabled: true,
    },
    {
      key: 'version',
      label: (
        <div style={{ width: '100%', textAlign: 'center' }}>Version: {packageJson.version}</div>
      ),
      disabled: true,
    },
  ];

  return (
    <Header className="main-header" style={{ paddingLeft: 0, background: colorFill }}>
      {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => setCollapsed(!collapsed),
      })}
      <div>
        <Text strong>{userName}</Text>

        <Dropdown menu={{ items }} trigger={['click']} placement="bottomLeft">
          <a onClick={(e) => e.preventDefault()}>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          </a>
        </Dropdown>
      </div>
    </Header>
  );
}

export default AppHeader;
