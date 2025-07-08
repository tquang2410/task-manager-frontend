import { createContext, useContext, useReducer, useEffect } from 'react';
import { message } from 'antd';

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
      return { ...state, tasks: action.payload };

    case TASK_ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
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

// Mock data for tasks
const mockTasks = [
  {
    id: 1,
    title: "Complete project proposal",
    description: "Write detailed project proposal for Q4",
    status: "pending",
    priority: "high",
    dueDate: "2024-07-15",
    createdAt: "2024-07-08"
  },
  {
    id: 2,
    title: "Review code changes",
    description: "Review pull requests from team members",
    status: "in-progress",
    priority: "medium",
    dueDate: "2024-07-10",
    createdAt: "2024-07-07"
  },
  {
    id: 3,
    title: "Update documentation",
    description: "Update API documentation for new endpoints",
    status: "pending",
    priority: "low",
    dueDate: "2024-07-20",
    createdAt: "2024-07-06"
  },
  {
    id: 4,
    title: "Fix responsive issues",
    description: "Fix mobile layout issues on dashboard",
    status: "completed",
    priority: "high",
    dueDate: "2024-07-05",
    createdAt: "2024-07-05"
  },
  {
    id: 5,
    title: "Setup testing environment",
    description: "Configure Jest and React Testing Library",
    status: "in-progress",
    priority: "medium",
    dueDate: "2024-07-12",
    createdAt: "2024-07-04"
  }
];

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

    // Simulate API call delay
    setTimeout(() => {
      dispatch({ type: TASK_ACTIONS.SET_TASKS, payload: mockTasks });
      dispatch({ type: TASK_ACTIONS.SET_LOADING, payload: false });
    }, 1000);
  };

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(), // Simple ID generation
      ...taskData,
      createdAt: new Date().toISOString()
    };

    dispatch({ type: TASK_ACTIONS.ADD_TASK, payload: newTask });
    message.success('Task created successfully');
  };

  const updateTask = (taskId, taskData) => {
    dispatch({
      type: TASK_ACTIONS.UPDATE_TASK,
      payload: { id: taskId, data: taskData }
    });
    message.success('Task updated successfully');
  };

  const deleteTask = (taskId) => {
    dispatch({ type: TASK_ACTIONS.DELETE_TASK, payload: taskId });
    message.success('Task deleted successfully');
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