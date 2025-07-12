import axiosInstance from './axios.config';

// Authentication APIs
export const authAPI = {
    // Login user
    login: async (email, password) => {
        const response = await axiosInstance.post('/v1/api/login', {
            email,
            password,
        });
        return response;
    },

    // Register user
    register: async (name, email, password) => {
        const response = await axiosInstance.post('/v1/api/register', {
            name,
            email,
            password,
        });
        return response;
    },

    // Get current user profile
    getProfile: async () => {
        const response = await axiosInstance.get('/v1/api/account');
        return response;
    },

    // Update user profile
    updateProfile: async (userData) => {
        const response = await axiosInstance.put('/v1/api/account', userData);
        return response;
    },
    updatePassword: async (oldPassword, newPassword) => {
        const response = await axiosInstance.put('/v1/api/account/password', {
            oldPassword,
            newPassword,
        });
        return response;
    },
};

// Task APIs
export const taskAPI = {
    // Get all tasks for current user
    getTasks: async (filters = {}) => {
        const params = new URLSearchParams(filters);
        const response = await axiosInstance.get(`/v1/api/tasks?${params}`);
        return response;
    },

    // Get single task by ID
    getTaskById: async (taskId) => {
        const response = await axiosInstance.get(`/v1/api/tasks/${taskId}`);
        return response;
    },

    // Create new task
    createTask: async (taskData) => {
        const response = await axiosInstance.post('/v1/api/tasks', taskData);
        return response;
    },

    // Update task
    updateTask: async (taskId, taskData) => {
        const response = await axiosInstance.put(`/v1/api/tasks/${taskId}`, taskData);
        return response;
    },

    // Delete task
    deleteTask: async (taskId) => {
        const response = await axiosInstance.delete(`/v1/api/tasks/${taskId}`);
        return response;
    },

    // Update task status
    updateTaskStatus: async (taskId, status) => {
        const response = await axiosInstance.patch(`/v1/api/tasks/${taskId}/status`, {
            status,
        });
        return response;
    },
};

// User management APIs (admin functions)
export const userAPI = {
    // Get all users (admin only)
    getUsers: async () => {
        const response = await axiosInstance.get('/v1/api/user');
        return response;
    },

    // Get user by ID
    getUser: async (userId) => {
        const response = await axiosInstance.get(`/v1/api/users/${userId}`);
        return response;
    },
};

// Utility function for file upload
export const uploadAPI = {
    // Upload file (if needed for avatars, attachments, etc.)
    uploadFile: async (file, folder = 'general') => {
        const formData = new FormData();
        formData.append('file', folder);
        formData.append('folder', folder);

        const response = await axiosInstance.post('/v1/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    },
};

// Export all APIs as default
export default {
    auth: authAPI,
    task: taskAPI,
    user: userAPI,
    upload: uploadAPI,
};