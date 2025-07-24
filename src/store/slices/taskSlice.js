import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: [],
    loading: false,
    filter: 'all',
    isModalOpen: false,
    editingTask: null,
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // Loading states
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        // Tasks CRUD
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },

        addTask: (state, action) => {
            state.tasks.unshift(action.payload); // Thêm vào đầu mảng
        },

        updateTask: (state, action) => {
            const { id, data } = action.payload;
            const index = state.tasks.findIndex(task => task.id === id);
            if (index !== -1) {
                state.tasks[index] = { ...state.tasks[index], ...data };
            }
        },

        deleteTask: (state, action) => {
            const taskId = action.payload;
            state.tasks = state.tasks.filter(task => task.id !== taskId);
        },

        // Filter
        setFilter: (state, action) => {
            state.filter = action.payload;
        },

        // Modal states
        setModalOpen: (state, action) => {
            state.isModalOpen = action.payload;
        },

        setEditingTask: (state, action) => {
            state.editingTask = action.payload;
        },

        // Helper actions
        openModal: (state, action) => {
            state.isModalOpen = true;
            state.editingTask = action.payload || null; // null = add mode
        },

        closeModal: (state) => {
            state.isModalOpen = false;
            state.editingTask = null;
        },
    },
});

// Export actions
export const {
    setLoading,
    setTasks,
    addTask,
    updateTask,
    deleteTask,
    setFilter,
    setModalOpen,
    setEditingTask,
    openModal,
    closeModal,
} = taskSlice.actions;

// Export reducer
export default taskSlice.reducer;