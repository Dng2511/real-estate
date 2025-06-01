import React from 'react';
import { Form, Input, Button, Typography, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link as Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../shared/components/auth/AuthContext';

const { Title, Text, Link } = Typography;

const Login = () => {

    const {handleLogin} = React.useContext(AuthContext);
    const navigate = useNavigate();

    const login = async (data) => {
        try{
            await handleLogin(data, navigate);
        } catch (e){
            console.log(e);
        }
        
    }


    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#f5f5f5'
        }}>
            <Card style={{ width: 400 }}>
                <Title level={3} style={{ textAlign: 'center' }}>Đăng nhập</Title>
                <Form
                    name="login"
                    layout="vertical"
                    onFinish={login}
                >
                    <Form.Item
                        label="Email"
                        type="email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Nhập email" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Đăng nhập
                        </Button>
                    </Form.Item>

                    <div style={{ textAlign: 'center' }}>
                        <Text>Bạn chưa có tài khoản? </Text>
                        <Link><Navigate to="/register">Tạo tài khoản ngay</Navigate></Link>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
