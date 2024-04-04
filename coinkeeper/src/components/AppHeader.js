import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

const AppHeader = ({ handleLogout }) => {
    return (
        <Header>
            <div className="HeaderApp">
                <div className="left-menu">
                    <span className="menu-item">หน้าหลัก</span>
                </div>
                <div className="right-menu">
                    <span className="menu-item" onClick={handleLogout}>ออกจากระบบ</span>
                </div>
            </div>
        </Header>
    );
}

export default AppHeader;
