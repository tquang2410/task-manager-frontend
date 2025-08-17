import React, {useEffect, useState} from 'react';
import { Button, Space, Modal, Spin } from 'antd';
import { PlusOutlined, LeftOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import useTask from '../hooks/useTask';
import TaskModal from '../components/tasks/TaskModal';
import TaskList from '../components/tasks/TaskList';
import styles from '../styles/components/PageLayout.module.css';
import SearchBox from '../components/common/SearchBox.jsx';
import SearchSuggestions from '../components/common/SearchSuggestions.jsx';
import GachaModal from '../components/common/GachaModal';
import { closeGachaModal } from '../store/slices/taskSlice';

const TasksPage = () => {
    const dispatch = useDispatch();
    const { isGachaModalOpen, gachaResults } = useSelector(state => state.tasks);
    const [localIsGachaModalOpen, setLocalIsGachaModalOpen] = useState(false);

    // Sửa hàm handleTaskSelect để nó nhận toàn bộ đối tượng task
    const handleTaskSelect = (task) => {
        openModal(task);
    };

    useEffect(() => {
        if ( isGachaModalOpen) {
            setLocalIsGachaModalOpen(true);
        } else {
            const timer = setTimeout(() => {
                setLocalIsGachaModalOpen(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isGachaModalOpen]);

    const {
        filteredTasks,
        loading,
        filter,
        setFilter,
        openModal,
        deleteTask,
        searchTerm,
        setSearchTerm,
        suggestionTasks,
        isBulkDeleteMode,
        toggleBulkDeleteMode,
        selectedTaskIds,
        toggleTaskSelection,
        deleteSelectedTasks,
    } = useTask();

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: filteredTasks.length,
    });

    React.useEffect(() => {
        setPagination(prev => ({
            ...prev,
            total: filteredTasks.length,
            current: 1,
        }));
    }, [filteredTasks.length]);

    const handleDeleteTask = (taskId) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'This action cannot be undone.',
            onOk: () => deleteTask(taskId),
        });
    };
    const handleDeleteSelectedTasks = () => {
        Modal.confirm({
            title: `Are you sure you want to delete ${selectedTaskIds.length} tasks?`,
            content: 'This action cannot be undone.',
            onOk: () => deleteSelectedTasks(),
        });
    };
    const handlePaginationChange = (page, size) => {
        setPagination(prev => ({
            ...prev,
            current: page,
            pageSize: size,
        }));
    };

    const handleCloseGachaModal = () => {
        dispatch(closeGachaModal());
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Welcome to Task Manager</h1>
                <Space>
                    <Button
                        className={styles.createButton}
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => openModal()}
                    >
                        Create Task
                    </Button>
                </Space>
            </div>

            <div className={styles.toolbar}>
                <Space>
                    <div style={{position: 'relative', flexGrow: 1}}>
                        <SearchBox searchTerm={searchTerm} onSearch={setSearchTerm}/>
                        {searchTerm && (
                            <SearchSuggestions
                                suggestions={suggestionTasks}
                                onSelect={setSearchTerm}
                            />
                        )}
                    </div>
                </Space>
                <Space>
                    {isBulkDeleteMode && (
                        <Button onClick={() => toggleBulkDeleteMode()}>
                            <LeftOutlined /> Back
                        </Button>
                    )}
                    <Button
                        type={isBulkDeleteMode ? 'danger' : 'default'}
                        onClick={isBulkDeleteMode ? handleDeleteSelectedTasks : toggleBulkDeleteMode}
                        disabled={isBulkDeleteMode && selectedTaskIds.length === 0}
                    >
                        {isBulkDeleteMode ? `Delete selected (${selectedTaskIds.length})` : 'Select tasks'}
                    </Button>
                </Space>
            </div>

            <div className="filter-buttons">
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

            <TaskList
                tasks={filteredTasks}
                loading={loading}
                onEdit={openModal}
                onDelete={handleDeleteTask}
                pagination={pagination}
                onPaginationChange={handlePaginationChange}
                isBulkDeleteMode={isBulkDeleteMode}
                selectedTaskIds={selectedTaskIds}
                toggleTaskSelection={toggleTaskSelection}
            />

            <TaskModal />
            <GachaModal
                isOpen={localIsGachaModalOpen}
                onClose={handleCloseGachaModal}
                tasks={gachaResults}
                onTaskSelect={handleTaskSelect}
            />
        </div>
    );
};

export default TasksPage;