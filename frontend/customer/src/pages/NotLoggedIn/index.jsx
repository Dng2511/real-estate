import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const NotLoggedIn = () => {

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <Result
                status="warning"
                title="Bạn chưa đăng nhập"
                subTitle="Vui lòng đăng nhập để xem thông tin."
                extra={[
                    <Link to="/login">
                        <Button type="primary" key="login" style={{ width: 150 }}>
                            Đăng nhập ngay
                        </Button>
                    </Link>,
                    <Link to="/">
                        <Button key="home" style={{ width: 150 }}>
                            Về trang chủ
                        </Button>
                    </Link>
                ]}
            />
        </div>
    );
};

export default NotLoggedIn;
