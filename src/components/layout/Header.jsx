import { Layout, Dropdown, Avatar, Button, Typography } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { getAvatarById } from '../../utils/avatars';
import styles from '../../styles/components/Header.module.css'
import DateTimeDisplay from '../common/DateTimeDisplay';

const { Header: AntHeader } = Layout;

const Header = () => {
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

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
        // Sử dụng Fragment để bọc các phần tử lại
        <>
            <AntHeader className={styles.header}>
                <div className={styles.container}>

                    <DateTimeDisplay
                        showTime={false}
                        showDate={true}
                        showWeekday={true}
                        className={styles.datetimeDisplay}
                    />
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
        </>
    );
};

export default Header;