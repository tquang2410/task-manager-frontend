import { useAuth } from '../context/AuthContext';
import { useTaskContext } from '../context/TaskContext';
import {Card, Col, Row, Statistic} from "antd";
import { List } from "antd";
import { Button, Flex } from 'antd';
const DashboardPage = () => {
    const { user } = useAuth();
    const { tasks } = useTaskContext();
    
    // Calculate stats from real tasks
    const stats = {
        total: tasks.length,
        pending: tasks.filter(task => task.status === 'pending').length,
        inProgress: tasks.filter(task => task.status === 'in-progress').length,
        completed: tasks.filter(task => task.status === 'completed').length
    };
    
    // Get recent tasks (latest 5)
    const recentTasks = tasks
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
    return (

        <div className="page-container">
            <h1 className="page-title">Welcome back,<span className="user-name">{user?.name}!</span></h1>
            {/* TODO: Add stats card */}
            <Row gutter={16}>
                    <Col span={6}>
                        <Card>
                            <Statistic title="Total Tasks" value={stats.total} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic title="Pending" value={stats.pending} valueStyle={{ color: '#faad14' }} />
                        </Card>
                    </Col>

                    <Col span={6}>
                        <Card>
                            <Statistic title="In-progress" value={stats.inProgress} valueStyle={{ color: '#1890ff' }} />
                        </Card>
                    </Col>

                    <Col span={6}>
                        <Card>
                            <Statistic title="Completed" value={stats.completed} valueStyle={{ color: '#52c41a' }} />
                        </Card>
                    </Col>

            </Row>
            {/* TODO: Add recent tasks */}
            <List
                header={<div>Header</div>}
                bordered
                dataSource={recentTasks}
                renderItem={item => (
                    <List.Item>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            <span>{item.title}</span>
                            <span style={{ color: item.status === 'completed' ? '#52c41a' : item.status === 'in-progress' ? '#1890ff' : '#faad14' }}>
                    {item.status}
                </span>
                        </div>
                    </List.Item>
                )}
            />

        </div>
    );
};
export default DashboardPage;