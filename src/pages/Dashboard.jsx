import { useAuth } from '../context/AuthContext';
import {Card, Col, Row, Statistic} from "antd";
import { List } from "antd";
import { Button, Flex } from 'antd';
import { mockDashboardData } from '../utils/mockAPI';
const DashboardPage = () => {
    const { user } = useAuth();
    const {stats, recentTasks} = mockDashboardData;
    return (

        <div className="page-container">
            <h1>Welcome back, {user?.name}!</h1>
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
                footer={<div>Footer</div>}
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
            {/* TODO: Add quick actions */}
            <Flex gap="small" wrap>
                <span>Quick Action: </span>
                <Button type="primary">Create Task</Button>
                <Button>View All Tasks</Button>
            </Flex>
        </div>
    );
};
export default DashboardPage;