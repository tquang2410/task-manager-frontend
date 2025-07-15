import React, { useState } from 'react';
import { Button, Space, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTaskContext } from '../context/TaskContext';
import TaskModal from '../components/tasks/TaskModal';
import TaskList from '../components/tasks/TaskList';

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

    // Local pagination state
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: filteredTasks.length,
    });

    // Update pagination total when filteredTasks change
    React.useEffect(() => {
        setPagination(prev => ({
            ...prev,
            total: filteredTasks.length,
            current: 1, // Reset to page 1 when filter changes
        }));
    }, [filteredTasks.length]);

    // Handle delete with confirmation
    const handleDeleteTask = (taskId) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'This action cannot be undone.',
            onOk: () => deleteTask(taskId),
        });
    };

    // Handle pagination change
    const handlePaginationChange = (page, size) => {
        setPagination(prev => ({
            ...prev,
            current: page,
            pageSize: size,
        }));
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Tasks Management</h1>
                <Button
                    style={{ marginTop: 16 }}
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

            {/* TaskList component with pagination */}
            <TaskList
                tasks={filteredTasks}
                loading={loading}
                onEdit={openModal}
                onDelete={handleDeleteTask}
                pagination={pagination}
                onPaginationChange={handlePaginationChange}
            />

            {/* TaskModal */}
            <TaskModal />
        </div>
    );
};

export default TasksPage;