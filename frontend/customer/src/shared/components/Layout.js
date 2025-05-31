// src/layouts/CustomerLayout.jsx
import { Layout, Menu, Avatar, Dropdown, Card, Row, Col, Typography, Spin } from "antd";
import { HomeOutlined, ScheduleOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import React from "react";
import { getPropertyTypes } from "../api/api";

const { Header, Content, Footer } = Layout;

const CustomerLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [types, setTypes] = React.useState([]);

  const avatarMenuItems = [
    {
      icon: <UserOutlined />,
      label: <Link to="/profile">Hồ sơ</Link>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
    },
  ];

  React.useEffect(() => {
    getPropertyTypes().then(({ data }) => setTypes(data.data))
  }, [])

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header */}
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          boxShadow: "0 2px 8px #f0f1f2",
        }}
      >
        <div style={{ fontSize: 24, fontWeight: "bold" }}>
          <Link to="/" style={{ color: "#1890ff" }}>RealEstate</Link>
        </div>

        <Menu
          mode="horizontal"
          selectedKeys={[currentPath]}
          style={{ flex: 1, justifyContent: "center", borderBottom: "none" }}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Trang chủ</Link>
          </Menu.Item>
          <Menu.Item key="/appointments" icon={<ScheduleOutlined />}>
            <Link to="/appointments">Cuộc hẹn</Link>
          </Menu.Item>
        </Menu>

        <Dropdown menu={{ items: avatarMenuItems }} placement="bottomRight" arrow>
          <Avatar size="large" style={{ backgroundColor: "#1890ff", cursor: "pointer" }}>
            U
          </Avatar>
        </Dropdown>
      </Header>



      {/* Nội dung */}
      <Content style={{ padding: "24px", background: "#f5f5f5" }}>
        <div style={{ padding: "10px", background: "#ffffff", borderRadius: 8, marginBottom: 5 }}>
          <Row gutter={[14, 14]} justify="center" align="middle">
            {types.map((type) => (
              <Link to={`/property-type/${type._id}`}>
                <Col key={type._id}>
                  <div
                    style={{
                      padding: "10px 16px",
                      backgroundColor: "#e6f7ff", // xanh nhạt
                      display: "flex",
                      justifyContent: "center",
                      borderRadius: "8px",
                      width: "120px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      color: "#1890ff",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#bae7ff";
                      e.currentTarget.style.color = "#096dd9";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#e6f7ff";
                      e.currentTarget.style.color = "#1890ff";
                    }}
                  >
                    {type.name}
                  </div>
                </Col>
              </Link>
            ))}
          </Row>
        </div>

        <div style={{ background: "#fff", padding: 24, borderRadius: 8, minHeight: 360 }}>
          <Outlet />
        </div>
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: "center" }}>
        RealEstate ©2025 Created by Phạm Văn Đồng
      </Footer>
    </Layout>
  );
};

export default CustomerLayout;
