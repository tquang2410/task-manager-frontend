import PropTypes from 'prop-types';
import { Table, Button, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CustomPagination from '../common/CustomPagination';
import styles from '../../styles/components/TaskList.module.css'

const TaskList = ({ tasks, loading, onEdit, onDelete, pagination, onPaginationChange }) => {

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (title, record) => (
                <div>
                    <div className={styles.taskTitle}>{title}</div>
                    {record.description && (
                        <div className={styles.taskDescription}>
                            {record.description}
                        </div>
                    )}
                </div>
            ),
            onCell: () => ({
                'data-label': 'Title'
            }),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag
                    className={styles.statusBadge}
                    color={
                        status === 'completed' ? 'green' :
                            status === 'in-progress' ? 'blue' : 'orange'
                    }
                >
                    {status.replace('-', ' ').toUpperCase()}
                </Tag>
            ),
            onCell: () => ({
                'data-label': 'Status'
            }),
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
            onCell: () => ({
                'data-label': 'Priority'
            }),
        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
            render: (date) => new Date(date).toLocaleDateString(),
            onCell: () => ({
                'data-label': 'Due Date'
            }),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div className={styles.actionButtons}>
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
                </div>
            ),
            onCell: () => ({
                'data-label': 'Actions'
            }),
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
        <div className={styles.taskList}>
            <Table
                className={styles.table}
                columns={columns}
                dataSource={paginatedTasks}
                loading={loading}
                rowKey="id"
                pagination={false}
                locale={{
                    emptyText: 'No tasks yet. Create your first task!'
                }}
            />

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