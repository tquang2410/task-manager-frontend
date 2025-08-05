import React from 'react';
import { Layout, Dropdown, Avatar, Button, Typography } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { getAvatarById} from '../../utils/avatars';
import styles from '../../styles/components/Header.module.css'
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
dayjs.extend(weekday);
import { useState, useEffect } from 'react';

const { Header: AntHeader } = Layout;

const Header = () => {
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useAuth();
    console.log('🔍 Header render - user avatarId:', user?.avatarId);
    console.log('🔍 Header render - user object:', user);

    const [currentTime, setCurrentTime] = useState(dayjs());
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(dayjs());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

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
                <Typography.Text className={styles.datetimeDisplay}>
                    Today is {currentTime.format('DD/MM/YYYY')}. Have a good {currentTime.format('dddd')}
                </Typography.Text>

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