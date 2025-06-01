// src/layouts/CustomerLayout.jsx
import { Layout, Menu, Avatar, Dropdown, Row, Col, Button } from "antd";
import { HomeOutlined, ScheduleOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import React from "react";
import { getPropertyTypes } from "../api/api";
import { AuthContext } from "./auth/AuthContext";

const { Header, Content, Footer } = Layout;

const CustomerLayout = () => {
  const params = useParams();
  const id = params.id;
  const location = useLocation();
  const currentPath = location.pathname;
  const [types, setTypes] = React.useState([]);
  const { user, handleLogout } = React.useContext(AuthContext);



  const avatarMenuItems = [
    {
      icon: <UserOutlined />,
      label: <Link to="/profile">Hồ sơ</Link>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      onClick: handleLogout,
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

        {user ? (
          <Dropdown menu={{ items: avatarMenuItems }} placement="bottomRight" arrow>
            <Avatar size="large" style={{ backgroundColor: "#1890ff", cursor: "pointer" }}>
              {user.charAt(0).toUpperCase()}
            </Avatar>
          </Dropdown>
        ) : (
          <Link to="/login">
            <Button type="link">
              Đăng nhập
            </Button>
          </Link>
        )}
      </Header>



      {/* Nội dung */}
      <Content style={{ padding: "24px", background: "#f5f5f5" }}>


        <div style={{ padding: "10px", background: "#ffffff", borderRadius: 8, marginBottom: 5 }}>
          <Row gutter={[14, 14]} justify="center" align="middle">
            {types.map((type) => (
              <Link to={id === type._id ? "properties" : `/property-type/${type._id}`}>
                <Col key={type._id}>
                  <div
                    style={{
                      padding: "10px 16px",
                      backgroundColor: type._id === id ? "#bae7ff" : "#e6f7ff", // xanh nhạt
                      display: "flex",
                      justifyContent: "center",
                      borderRadius: "8px",
                      width: "120px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      color: type._id === id ? "#096dd9" : "#1890ff",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#bae7ff";
                      e.currentTarget.style.color = "#096dd9";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = type._id === id ? "#bae7ff" : "#e6f7ff";
                      e.currentTarget.style.color = type._id === id ? "#096dd9" : "#1890ff";
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
