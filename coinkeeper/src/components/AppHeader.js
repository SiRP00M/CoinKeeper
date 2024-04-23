import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const AppHeader = ({ handleLogout, jwt,navigate }) => {
    return (
        <Header>
            <div className="HeaderApp">
                <div className="left-menu">
                    <span className="menu-item">หน้าหลัก</span>
                </div>
                <div className="right-menu">
                    {jwt && (
                        <span onClick={handleLogout}>ออกจากระบบ</span>
                    )}
                     <Link to="/login" className="menu-item">เข้าสู่ระบบ</Link>
                     <Link to="/register" className="menu-item">ลงทะเบียน</Link>
                </div>
            </div>
        </Header>
    );
}

export default AppHeader;
