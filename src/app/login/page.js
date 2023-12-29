// pages/login.js
'use client'
import Link from 'next/link';

const Login = () => {
    return (
        <div className="full-page">
            <div className="container mt-5 content-wrapper">
                <div className="p-4 rounded content-container">
                    <h1>Đăng nhập vào trang Quản lý</h1>
                    <div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Nhập email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Mật khẩu</label>
                            <input type="password" className="form-control" id="password" placeholder="Nhập mật khẩu" />
                        </div>
                        <button onClick={() => alert('cac')} className="btn btn-primary">Đăng nhập</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;
