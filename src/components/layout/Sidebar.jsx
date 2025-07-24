// ví dụ trong file src/components/Sidebar.js
import React,{ useState} from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../../styles/components/Sidebar.module.css';
import { DashboardOutlined, ProfileOutlined, UnorderedListOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false); // Thêm state để quản lý trạng thái thu gọn
    const menuItems = [
        { key: '/', label: 'Dashboard', icon: <DashboardOutlined /> },
        { key: '/tasks', label: 'Tasks', icon: <UnorderedListOutlined /> },
        { key: '/profile', label: 'Profile', icon: <ProfileOutlined /> },
    ];

    return (
        <Sider collapsible
               collapsed={collapsed}
               onCollapse={(value) => setCollapsed(value)}
               width={220}
               className={styles.sidebar}>
            {/*Sau này sẽ đặt ảnh background */}
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[location.pathname]}
                items={menuItems}
                onClick={({ key }) => navigate(key)}
            />
        </Sider>
    );
};

export default Sidebar;