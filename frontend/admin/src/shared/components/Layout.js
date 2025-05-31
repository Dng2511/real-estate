import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  AppstoreOutlined,
  HomeFilled,
  CalendarOutlined
} from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} trigger={null}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.3)',
            textAlign: 'center',
            color: 'white',
            lineHeight: '32px',
            fontWeight: 'bold',
          }}
        >
          LOGO
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: <Link to="/">Dashboard</Link>,
            },
            {
              key: '2',
              icon: <HomeFilled />,
              label: <Link to="/properties">Properties</Link>,
            },
            {
              key: '3',
              icon: <AppstoreOutlined />,
              label: <Link to="/property-types">Property Types</Link>,
            },
            {
              key: '4',
              icon: <CalendarOutlined />,
              label: <Link to="/appointments">Appointments</Link>,
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: '0 16px',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{ fontSize: 18, width: 40, height: 40 }}
          />
          <h3 style={{ marginLeft: 16 }}>Admin Dashboard</h3>
        </Header>

        <Content style={{ margin: '16px', background: '#fff', padding: 24, minHeight: 280 }}>
          {children}
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          ©2025 Your Company - Powered by Ant Design
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
