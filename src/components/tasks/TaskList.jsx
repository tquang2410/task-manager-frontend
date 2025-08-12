import PropTypes from 'prop-types';
import { Table, Button, Tag, Checkbox, Space } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import CustomPagination from '../common/CustomPagination';
import styles from '../../styles/components/TaskList.module.css';

const TaskList = ({
                      tasks,
                      loading,
                      onEdit,
                      onDelete,
                      pagination,
                      onPaginationChange,
                      isBulkDeleteMode,
                      selectedTaskIds,
                      toggleTaskSelection
                  }) => {

    const getColumns = () => {
        let columns = [];

        if (isBulkDeleteMode) {
            columns.push({
                key: 'checkbox',
                width: 50,
                render: (_, record) => (
                    <Checkbox
                        checked={selectedTaskIds.includes(record.id)}
                        onChange={() => toggleTaskSelection(record.id)}
                    />
                ),
            });
        }

        columns.push(
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                render: (title, record) => (
                    <div>
                        <div className={styles.taskTitle}>
                            {title && title.length > 50
                                ? `${title.substring(0, 50)}...`
                                : title
                            }
                        </div>
                        {record.description && (
                            <div className={styles.taskDescription}>
                                {record.description.length > 100
                                    ? `${record.description.substring(0, 100)}...`
                                    : record.description
                                }
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
            }
        );

        // Chỉ hiển thị cột Actions khi KHÔNG ở chế độ xóa hàng loạt
        if (!isBulkDeleteMode) {
            columns.push({
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
                        {record.status !== 'completed' && (
                            <Button
                                type="text"
                                icon={<CheckOutlined />}
                                onClick={() => onEdit({ ...record, status: 'completed' })}
                                title="Finish task"
                            />
                        )}
                    </div>
                ),
                onCell: () => ({
                    'data-label': 'Actions'
                }),
            });
        }

        return columns;
    };

    const columns = getColumns();

    // Calculate pagination data
    const { current, pageSize, total } = pagination;
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedTasks = tasks.slice(startIndex, endIndex);

    return (
        <div className={styles.taskList}>
            <Table
                className={styles.table}
                columns={columns}
                dataSource={paginatedTasks}
                loading={loading}
                rowKey="id"
                pagination={false}
                expandable={{
                    expandedRowRender: (record) => (
                        <p className={styles.expandedDescription}>
                            {record.description}
                        </p>
                    ),
                    rowExpandable: (record) => record.description !== '',
                }}
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
    isBulkDeleteMode: PropTypes.bool.isRequired,
    selectedTaskIds: PropTypes.array.isRequired,
    toggleTaskSelection: PropTypes.func.isRequired,
};

export default TaskList;