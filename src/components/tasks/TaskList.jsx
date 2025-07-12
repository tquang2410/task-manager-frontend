import PropTypes from 'prop-types';
import { Table, Button, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CustomPagination from '../common/CustomPagination';

const TaskList = ({ tasks, loading, onEdit, onDelete, pagination, onPaginationChange }) => {
    console.log('🔍 TaskList received tasks:', tasks.length);
    console.log('🔍 First few tasks:', tasks.slice(0, 3));

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
                        onClick={() => onEdit(record)}
                        title="Edit task"
                    />
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => onDelete(record.id)}
                        title="Delete task"
                    />
                </Space>
            ),
        },
    ];

    // Calculate pagination data
    const { current, pageSize, total } = pagination;
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedTasks = tasks.slice(startIndex, endIndex);

    console.log('🔍 Pagination:', { current, pageSize, total });
    console.log('🔍 Showing tasks:', startIndex, 'to', endIndex);
    console.log('🔍 Paginated tasks length:', paginatedTasks.length);

    return (
        <div>
            {/* Table without pagination */}
            <Table
                columns={columns}
                dataSource={paginatedTasks}
                loading={loading}
                rowKey="id"
                pagination={false}
                locale={{
                    emptyText: 'No tasks yet. Create your first task!'
                }}
            />

            {/* Custom Pagination */}
            <CustomPagination
                current={current}
                pageSize={pageSize}
                total={total}
                onChange={onPaginationChange}
            />
        </div>
    );
};

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    loading: PropTypes.bool,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    pagination: PropTypes.object.isRequired,
    onPaginationChange: PropTypes.func.isRequired,
};

export default TaskList;