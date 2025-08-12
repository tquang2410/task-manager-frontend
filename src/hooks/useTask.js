import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { taskAPI } from '../utils/api';
import useAuth from './useAuth';
import {useEffect, useState} from 'react';

// Use for changing state
import {
    setLoading,
    setTasks,
    addTask,
    updateTask,
    deleteTask,
    setFilter,
    openModal,
    closeModal,
    setSearchTerm,

} from '../store/slices/taskSlice';


const useTask = () => {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useAuth();

    // Local state for bulk deletion
    const [selectedTaskIds, setSelectedTaskIds] = useState([]);
    const  [isBulkDeleteMode, setIsBulkDeleteMode] = useState(false);

    // This line get the tasks and related state from the Redux store
    const { tasks, loading, filter, isModalOpen, editingTask, searchTerm } = useSelector(
        (state) => state.tasks
    );

    // Auto-load tasks when authenticated
    useEffect(() => {
        if (isAuthenticated && user) {
            console.log('🔄 Auth state changed - loading tasks for user:', user.email);
            loadTasks();
        } else {
            console.log('🚪 User logged out - clearing tasks');
            dispatch(setTasks([]));
        }
    }, [isAuthenticated, user?.email]);
    // Load tasks - call this when needed ( refresh, retry, etc.)
    const loadTasks = async () => {
        dispatch(setLoading(true));
        try {
            const response = await taskAPI.getTasks();
            const transformedTasks = response.tasks.map(task => ({
                ...task,
                id: task._id
            }));
            dispatch(setTasks(transformedTasks));
        } catch (error) {
            message.error('Failed to load tasks');
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Create task
    const createTask = async (taskData) => {
        try {
            const response = await taskAPI.createTask(taskData);
            const transformedTask = {
                ...response.task,
                id: response.task._id
            };
            dispatch(addTask(transformedTask));
            message.success('Task created successfully');
        } catch (error) {
            message.error('Failed to create task');
        }
    };

    // Update task
    const updateTaskHandler = async (taskId, taskData) => {
        try {
            const response = await taskAPI.updateTask(taskId, taskData);
            dispatch(updateTask({ id: taskId, data: response.task }));
            message.success('Task updated successfully');
        } catch (error) {
            message.error('Failed to update task');
        }
    };

    // Delete task
    const deleteTaskHandler = async (taskId) => {
        try {
            await taskAPI.deleteTask(taskId);
            dispatch(deleteTask(taskId));
            message.success('Task deleted successfully');
        } catch (error) {
            message.error('Failed to delete task');
        }
    };

    // Delete bulk tasks
    const deleteSelectedTasks = async () => {
        if (selectedTaskIds.length === 0) return;

        try {
            await taskAPI.deleteBulkTasks(selectedTaskIds);
            dispatch(deleteTask(selectedTaskIds));
            message.success(`Deleted ${selectedTaskIds.length} tasks successfully`);
            setSelectedTaskIds([]); // Clear selection after deletion
            setIsBulkDeleteMode(false); // Exit bulk delete mode
        } catch (error) {
            console.error('API Error:', error.response);
            message.error('Failed to delete selected tasks');
        }
    };
    // Toggle bulk delete mode
    const toggleBulkDeleteMode = () => {
        setIsBulkDeleteMode(prevMode => !prevMode);
        if (isBulkDeleteMode) {
            setSelectedTaskIds([]); // Clear selection when exiting bulk delete mode
        }
    };

    const toggleTaskSelection = (taskId) => {
        setSelectedTaskIds(prevIds => {
            if (prevIds.includes(taskId))
            {
                // If already selected, remove it
                return prevIds.filter(id => id !== taskId);
            } else {
                // If not selected, add it
                return [...prevIds, taskId];
            }
        });
    };

    // Lower case search term for case-insensitive search
    const searchTermLower = searchTerm.toLowerCase();

    const filteredTasks = tasks.filter(task => {
        // Search title
        const searchMatch = task.title.toLowerCase().includes(searchTermLower);
        // Search by filter
        const statusMatch = filter === 'all' || task.status === filter;

        return searchMatch && statusMatch;
    });

    // Suggestion search term
    const suggestionTasks = searchTerm ? tasks.filter(task => task.title.toLowerCase().includes(searchTermLower)).slice(0, 10).map(task => ({
        id: task.id,
        title: task.title,
        status: task.status,
    })) : []; // Limit suggestions to 10

    const isEditMode = editingTask !== null;

    return {
        // State
        tasks,
        filteredTasks,
        loading,
        filter,
        isModalOpen,
        editingTask,
        isEditMode,
        searchTerm,
        suggestionTasks,
        isBulkDeleteMode,
        selectedTaskIds,

        // Actions
        loadTasks,
        createTask,
        updateTask: updateTaskHandler,
        deleteTask: deleteTaskHandler,
        setFilter: (newFilter) => dispatch(setFilter(newFilter)),
        openModal: (task = null) => dispatch(openModal(task)),
        closeModal: () => dispatch(closeModal()),
        setSearchTerm: (value) => dispatch(setSearchTerm(value)),
        toggleBulkDeleteMode,
        deleteSelectedTasks,
        toggleTaskSelection,

    };
};

export default useTask;