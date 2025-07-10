import { Button, Table, Space, Tag, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTaskContext } from '../context/TaskContext';
import TaskModal from '../components/tasks/TaskModal'
const TasksPage = () => {
    // Get state and actions from TaskContext
    const {
        filteredTasks,
        loading,
        filter,
        setFilter,
        openModal,
        deleteTask,
    } = useTaskContext();

    // Handle delete with confirmation
    const handleDeleteTask = (taskId) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'This action cannot be undone.',
            onOk: () => deleteTask(taskId),
        });
    };

    // Table columns configuration
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (title, record) => (
                <div>
                    <div style={{ fontWeight: 'bold' }}>{title}</div>
                    {record.description && (
                        <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                            {record.description}
                        </div>
                    )}
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={
                    status === 'completed' ? 'green' :
                        status === 'in-progress' ? 'blue' : 'orange'
                }>
                    {status.replace('-', ' ').toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            render: (priority) => (
                <Tag color={
                    priority === 'high' ? 'red' :
                        priority === 'medium' ? 'orange' : 'default'
                }>
                    {priority.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => {
                            openModal(record);
                        }}
                        title="Edit task"
                    />
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteTask(record.id)}
                        title="Delete task"
                    />
                </Space>
            ),
        },
    ];

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Tasks Management</h1>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => openModal()} // null = add mode
                >
                    Create Task
                </Button>
            </div>

            {/* Filter Buttons */}
            <Space style={{ marginBottom: 16 }}>
                <Button
                    type={filter === 'all' ? 'primary' : 'default'}
                    onClick={() => setFilter('all')}
                >
                    All ({filteredTasks.length})
                </Button>
                <Button
                    type={filter === 'pending' ? 'primary' : 'default'}
                    onClick={() => setFilter('pending')}
                >
                    Pending
                </Button>
                <Button
                    type={filter === 'in-progress' ? 'primary' : 'default'}
                    onClick={() => setFilter('in-progress')}
                >
                    In Progress
                </Button>
                <Button
                    type={filter === 'completed' ? 'primary' : 'default'}
                    onClick={() => setFilter('completed')}
                >
                    Completed
                </Button>
            </Space>

            {/* Tasks Table */}
            <Table
                columns={columns}
                dataSource={filteredTasks}
                loading={loading}
                rowKey="id"
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} tasks`
                }}
                locale={{
                    emptyText: filter === 'all'
                        ? 'No tasks yet. Create your first task!'
                        : `No ${filter} tasks found.`
                }}
            />

            {/* TaskModal will be added next */}
            <TaskModal />

            {/* Footer */}
        </div>
    );
};

export default TasksPage;