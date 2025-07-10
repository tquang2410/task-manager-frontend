import { createContext, useContext, useReducer, useEffect } from 'react';
import { message } from 'antd';
import { taskAPI } from '../utils/api';

// Create context
const TaskContext = createContext();

// Hook to use TaskContext
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within TaskProvider');
  }
  return context;
};

// Action types (like constants for reducer)
const TASK_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_TASKS: 'SET_TASKS',
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  SET_FILTER: 'SET_FILTER',
  SET_MODAL_STATE: 'SET_MODAL_STATE',
  SET_EDITING_TASK: 'SET_EDITING_TASK'
};

// Initial state
const initialState = {
  tasks: [],
  loading: false,
  filter: 'all',
  isModalOpen: false,
  editingTask: null, // null = add mode, object = edit mode
};

// Reducer function (handles all state changes)
const taskReducer = (state, action) => {
  switch (action.type) {
    case TASK_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };

    case TASK_ACTIONS.SET_TASKS:
      console.log('🔄 Reducer SET_TASKS:', action.payload);
      return { ...state, tasks: action.payload };

    case TASK_ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [action.payload,...state.tasks]
      };

    case TASK_ACTIONS.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
            task.id === action.payload.id
                ? { ...task, ...action.payload.data }
                : task
        )
      };

    case TASK_ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };

    case TASK_ACTIONS.SET_FILTER:
      return { ...state, filter: action.payload };

    case TASK_ACTIONS.SET_MODAL_STATE:
      return { ...state, isModalOpen: action.payload };

    case TASK_ACTIONS.SET_EDITING_TASK:
      return { ...state, editingTask: action.payload };

    default:
      return state;
  }
};

// TaskProvider component
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load tasks when provider mounts
  useEffect(() => {
    loadTasks();
  }, []);

  // Action creators (functions that dispatch actions)
  const loadTasks = async () => {
    dispatch({ type: TASK_ACTIONS.SET_LOADING, payload: true });

    try {
      console.log(' Calling getTasks API...');
      const response = await taskAPI.getTasks();
      console.log(' API Response:', response);
      // Transform tasks to match expected format
      const transformedTasks = response.tasks.map(task => ({
        ...task,
        id: task._id
      }));
      dispatch({ type: TASK_ACTIONS.SET_TASKS, payload: transformedTasks});
    } catch (error) {
      console.log(' API Error:', error);
      message.error('Failed to load tasks');
    } finally {
      dispatch({ type: TASK_ACTIONS.SET_LOADING, payload: false });
    }
  };

  const addTask = async (taskData) => {
    try {
      // Call API to create task
      const response = await taskAPI.createTask(taskData);
      const transformedTask = {
        ...response.task,
        id: response.task._id
      };
      // Dispatch action to add task to state
      dispatch({
        type: TASK_ACTIONS.ADD_TASK,
        payload: transformedTask
      });
      message.success('Task created successfully');
    } catch (error) {
      console.error('Error adding task:', error);
      message.error('Failed to create task' + (error.EM || error.message));
    }
  };

  const updateTask = async (taskId, taskData) => {
    console.log('🔧 updateTask called with:');
    console.log('   taskId:', taskId);
    console.log('   taskId type:', typeof taskId);
    console.log('   taskData:', taskData);
    try {
      console.log(' Updating task:', taskId, taskData);

      const response = await taskAPI.updateTask(taskId, taskData);
      console.log(' Update response:', response);

      dispatch({
        type: TASK_ACTIONS.UPDATE_TASK,
        payload: { id: taskId, data: response.task }
      });

      message.success('Task updated successfully');

    } catch (error) {
      console.error(' Update error:', error);
      message.error('Failed to update task: ' + (error.EM || error.message));
    }
  };

  const deleteTask = async (taskId) => {
    try {
      // Call API to delete task
       await taskAPI.deleteTask(taskId);
       // Dispatch action to remove task from state
      dispatch({type: TASK_ACTIONS.DELETE_TASK, payload: taskId});
      message.success('Task deleted successfully');
    } catch (error) {
      console.error(' Delete error:', error);
      message.error('Failed to delete task: ' + (error.EM || error.message));
    }
  };

  const setFilter = (filter) => {
    dispatch({ type: TASK_ACTIONS.SET_FILTER, payload: filter });
  };

  const openModal = (task = null) => {
    dispatch({ type: TASK_ACTIONS.SET_EDITING_TASK, payload: task });
    dispatch({ type: TASK_ACTIONS.SET_MODAL_STATE, payload: true });
  };

  const closeModal = () => {
    dispatch({ type: TASK_ACTIONS.SET_MODAL_STATE, payload: false });
    dispatch({ type: TASK_ACTIONS.SET_EDITING_TASK, payload: null });
  };

  // Computed values
  const filteredTasks = state.tasks.filter(task => {
    if (state.filter === 'all') return true;
    return task.status === state.filter;
  });
  console.log('📋 Current state.tasks:', state.tasks);
  console.log('📋 Filtered tasks:', filteredTasks);

  const isEditMode = state.editingTask !== null;

  // Context value (what components can access)
  const value = {
    // State
    ...state,
    filteredTasks,
    isEditMode,

    // Actions
    loadTasks,
    addTask,
    updateTask,
    deleteTask,
    setFilter,
    openModal,
    closeModal,
  };

  return (
      <TaskContext.Provider value={value}>
        {children}
      </TaskContext.Provider>
  );
};