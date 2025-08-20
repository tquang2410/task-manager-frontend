import useAuth from "../hooks/useAuth.js";
import useTask from "../hooks/useTask.js";
import Task_manager_logo from "../assets/task_manager_logo.png";
import { Card, Col, Row, Statistic, List } from "antd";
import styles from '../styles/components/Dashboard.module.css';
import React from "react";

const DashboardPage = () => {
    const { user } = useAuth();
    const { tasks } = useTask();

    // Calculate stats from real tasks
    const stats = {
        total: tasks.length,
        pending: tasks.filter(task => task.status === 'pending').length,
        inProgress: tasks.filter(task => task.status === 'in-progress').length,
        completed: tasks.filter(task => task.status === 'completed').length
    };

    // Get recent tasks (latest 5)
    const recentTasks = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    return (
        <div className={styles.dashboard}>
            <img src={Task_manager_logo} alt="Task Manager Logo" className={styles.logo} />
            <div className={styles.welcomeSection}>

                <h1 className={styles.welcomeTitle}>

                    Welcome back, <span className={styles.userName}>{user?.name}!</span>
                </h1>

            </div>

            <Row gutter={16} className={styles.statsGrid}>
                <Col span={6}>
                    <Card className={styles.statCard}>
                        <Statistic title="Total Tasks" value={stats.total} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className={styles.statCard}>
                        <Statistic title="Pending" value={stats.pending} valueStyle={{ color: '#faad14' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className={styles.statCard}>
                        <Statistic title="In-progress" value={stats.inProgress} valueStyle={{ color: '#1890ff' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className={styles.statCard}>
                        <Statistic title="Completed" value={stats.completed} valueStyle={{ color: '#52c41a' }} />
                    </Card>
                </Col>
            </Row>

            <div className={styles.recentSection}>
                <List
                    className={styles.recentList}
                    header={<div className={styles.sectionTitle}>Recently</div>}
                    bordered
                    dataSource={recentTasks}
                    renderItem={item => (
                        <List.Item>
                            <div className={styles.taskItem}>
                                <span className={styles.taskName}>{item.title}</span>
                                <span
                                    className={styles.taskStatus}
                                    style={{
                                        color: item.status === 'completed' ? '#52c41a' :
                                            item.status === 'in-progress' ? '#1890ff' : '#faad14',
                                        backgroundColor: item.status === 'completed' ? '#f6ffed' :
                                            item.status === 'in-progress' ? '#e6f7ff' : '#fffbe6'
                                    }}
                                >
                                    {item.status}
                                </span>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
};

export default DashboardPage;