import { lazy, useState } from 'react';
import NotFound from '@/pages/NotFound';
import HomeLayout from '@/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { useAtom } from 'jotai';

import { userAuth } from '@/store';

const Login = lazy(() => import('@/pages/Login'));
const Home = lazy(() => import('@/pages/Home'));
const AppHeader = lazy(() => import('@/components/AppHeader'));
const AppSider = lazy(() => import('@/components/AppSideBar'));

// route name: bread crumb name

const AppRouter = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [isLoggedIn] = useAtom(userAuth);

  return (
    <Layout style={{ height: '100vh' }}>
      {isLoggedIn && <AppSider collapsed={collapsed} />}
      <Layout className="site-layout">
        <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Routes>
          <Route path="/" element={isLoggedIn ? <HomeLayout /> : <Navigate to="login" />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/" element={!isLoggedIn ? <Login /> : <Navigate to="/" />}>
            <Route path="login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Route>
          <Route path="/*" element={isLoggedIn ? <NotFound /> : <Navigate to="/login" />} />
        </Routes>
      </Layout>
    </Layout>
  );
};

export default AppRouter;
