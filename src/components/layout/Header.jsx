import React from 'react';
import { Layout, Dropdown, Avatar, Button } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { getAvatarById} from '../../utils/avatars';
import styles from '../../styles/components/Header.module.css'

const { Header: AntHeader } = Layout;

const Header = () => {
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useAuth();
    console.log('🔍 Header render - user avatarId:', user?.avatarId);
    console.log('🔍 Header render - user object:', user);


    // Chỗ này xử lý đăng xuất
    const handleLogout = () => {
        logout();
        navigate('/login'); // Điều hướng về trang đăng nhập sau khi đăng xuất
    };


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
        <AntHeader className={styles.header}>
            <div className={styles.container}>
                {/* Logo */}
                <div className={styles.logo}>
                    📋 TaskManager
                </div>
                {/* User Dropdown */}
                {isAuthenticated && (
                    <div className={styles.userSection}>
                        <Dropdown menu={{ items: userMenuItems }}
                                  placement="bottomRight">
                            <Button type="text">
                                <Avatar size="small"
                                        key={user?.avatarId || 1}
                                        src={getAvatarById(user?.avatarId || 1).src}
                                />
                                <span style={{ marginLeft: 8, color: 'white' }}>
                            {user?.name && user.name.length > 10
                                ? `${user.name.substring(0, 10)}...`
                                : user?.name
                            }
                        </span>
                            </Button>
                        </Dropdown>
                    </div>
                )}
            </div>
        </AntHeader>
    );
};

export default Header;