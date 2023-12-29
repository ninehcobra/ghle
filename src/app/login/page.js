// pages/login.js
'use client'
import Link from 'next/link';
import { useState } from 'react';
import { login } from '../services/userService';
import { useRouter } from 'next/navigation';

const Login = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const router = useRouter()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async () => {

        // Do something with loginData, for example, send it to the server
        let res = await login(loginData.email, loginData.password)
        if (res && res.EC === 0) {
            router.push('/dashboard')
        }
    };

    return (
        <div className="full-page">
            <div className="container mt-5 content-wrapper">
                <div className="p-4 rounded content-container">
                    <h1>Đăng nhập vào trang Quản lý</h1>
                    <div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Nhập email của bạn"
                                value={loginData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Mật khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Nhập mật khẩu"
                                value={loginData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button onClick={handleFormSubmit} className="btn btn-primary">Đăng nhập</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;
