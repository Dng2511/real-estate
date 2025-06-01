import { createContext, useState} from 'react';
import { login, register } from '../../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem('username') || null);
    console.log(user);


    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
    };

    const handleLogin = async (data, navigate) => {
        try {
            console.log(data);
            const response = await login(data);

            const { token, user } = response.data.data;

            // Lưu token vào localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('username', user.name);
            setUser(user.name);

            // Chuyển sang trang dashboard hoặc cập nhật trạng thái đăng nhập
            navigate('/');
        } catch (error) {
            alert(error.response?.data?.message || "Đăng nhập thất bại, vui lòng thử lại.");
        }
    };


    const handleRegister = async (data, navigate) => {
        try {
            const response = await register(data);
            if (response.status === 201) {
                alert('Tạo tài khoản thành công!');  // hoặc dùng thông báo đẹp hơn
                setTimeout(() => {
                    navigate('/login');
                }, 5000); // delay 5 giây trước khi chuyển trang
            }
        } catch (error) {
            console.error(error);
            alert('Có lỗi xảy ra, vui lòng thử lại.');
        }

    }



    return (
        <AuthContext.Provider value={{ user, handleLogin, handleRegister, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

