import React from 'react';
import { Layout, Menu, Dropdown, Avatar, Button } from 'antd';
import { UserOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const { Header: AntHeader } = Layout;

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout, isAuthenticated } = useAuth();
    // Chỗ này xử lý click menu
    const handleMenuClick = (e) => {
        navigate(e.key); // Điều hướng đến trang tương ứng
    };
    // Chỗ này xử lý đăng xuất
    const handleLogout = () => {
        logout();
        navigate('/login'); // Điều hướng về trang đăng nhập sau khi đăng xuất
    };

    const menuItems = [
        {
            key: '/',
            label: 'Dashboard',
        },
        {
            key: '/tasks',
            label: 'Tasks',
        },
        {
            key: '/profile',
            label: 'Profile',
        },
    ];
    // Tạo menu dropdown cho người dùng
    const userMenuItems = [
        {
            key: '/profile',
            label: 'Profile',
            icon: <UserOutlined />,
            onClick: () => navigate('/profile'),
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: 'Logout',
            icon: <LogoutOutlined />,
            onClick: handleLogout,
        },
    ];

  return (
      <AntHeader className="app-header">
        <div className="header-container">
            {/* Logo */}
            <div className="header-logo">
                📋 TaskManager
            </div>
            {/* Menu */}
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[location.pathname]}
                items={menuItems}
                onClick={handleMenuClick}
                className="header-menu"
            />
            {/* User Dropdown */}
            {isAuthenticated && (
                <div className="header-user">
                    <Dropdown menu={{ items: userMenuItems }}
                              placement="bottomRight">
                    <Button type="text">
                        <Avatar size="small" icon={<UserOutlined/>} />
                        <span style={{ marginLeft: 8 }}>{user?.name}</span>
                    </Button>
                    </Dropdown>
                </div>
            )}
        </div>
      </AntHeader>
  );
};

export default Header;
