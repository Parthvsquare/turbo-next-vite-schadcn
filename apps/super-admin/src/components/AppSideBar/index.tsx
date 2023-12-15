import { BarChartOutlined } from '@ant-design/icons';
import { Menu, Typography, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface IProps {
  collapsed: boolean;
}

const { Text } = Typography;

function AppSider({ collapsed }: IProps) {
  const {
    token: { colorFill },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();

  const pathSnippets = useMemo(() => location.pathname.split('/').filter((i) => i), [location]);

  function onClick(key: string) {
    navigate(key);
  }

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: colorFill }}>
      <span className="text-1xl py-9 text-white">Su Admin</span>
      <Menu
        style={{ background: colorFill }}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[`/${pathSnippets}`]}
        // selectedKeys={[`${selectedKeys[0]}`]}
        onClick={(e) => onClick(e.key)}
        items={[
          {
            key: '/',
            icon: <BarChartOutlined />,
            label: 'Home',
          },
        ]}
      />
    </Sider>
  );
}

export default AppSider;
