import { Skeleton, theme } from 'antd';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import { Content } from 'antd/es/layout/layout';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

function HomeLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        overflow: 'scroll',
      }}
    >
      <ErrorBoundary>
        <Suspense fallback={<Skeleton active={true} />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </Content>
  );
}

export default HomeLayout;
