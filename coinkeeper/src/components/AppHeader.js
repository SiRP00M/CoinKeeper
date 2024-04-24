import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const AppHeader = ({ handleLogout, jwt }) => {
    return (
        <Header>
            <div className="HeaderApp">
                <div className="left-menu">
                <span className='logo'>
                    <img src='https://static.vecteezy.com/system/resources/previews/027/517/677/original/pixel-art-red-chinese-gold-coin-png.png' alt="logo" />
                </span>
                    <span className="menu-item">Coinkeeper</span>
                </div>
                <div className="right-menu">
                    {jwt ? (
                        <span onClick={handleLogout}>ออกจากระบบ</span>
                    ) : (
                        <>
                            <Link to="/Login" className="menu-item">Login</Link>
                            <Link to="/Register" className="menu-item">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </Header>
    );
}

export default AppHeader;
