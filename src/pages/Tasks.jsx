import React, { useState } from 'react';
import { Button, Space, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useTask from '../hooks/useTask';
import TaskModal from '../components/tasks/TaskModal';
import TaskList from '../components/tasks/TaskList';
import styles from '../styles/components/PageLayout.module.css'
import SearchBox from "../components/common/SearchBox.jsx";
import SearchSuggestions from "../components/common/SearchSuggestions.jsx";
const TasksPage = () => {
    // Get state and actions from TaskContext
    const {
        filteredTasks,
        loading,
        filter,
        setFilter,
        openModal,
        deleteTask,
        searchTerm,
        setSearchTerm,
        suggestionTasks
    } = useTask();

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
        <div className={styles.pageContainer}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Welcome to Task Manager</h1>
                <Button
                    className={styles.createButton}

                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => openModal()} // null = add mode
                >
                    Create Task
                </Button>
                <div style={{position: 'relative'}}>
                    <SearchBox searchTerm={searchTerm} onSearch={setSearchTerm}/>
                    {searchTerm && (
                        <SearchSuggestions
                            suggestions={suggestionTasks}
                            onSelect={setSearchTerm}
                        />
                    )}
                </div>
            </div>

            <div className="filter-buttons">
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
            </div>

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