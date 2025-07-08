
// Mock delay để giống real API
const mockDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user data
const generateMockUser = (name, email) => ({
    id: Date.now().toString(), // Simple ID generation
    name: name,
    email: email,
    createdAt: new Date().toISOString()
});

// Mock register function
export const mockRegister = async (name, email, password) => {
    // Add realistic delay
    await mockDelay(800);
// TODO: Add your error conditions here
    if (email === 'admin@gmail.com') {  // ← What email should fail?
        throw new Error('Email already exists');
    }

    if (password.length < 6) {  // ← Another realistic check
        throw new Error('Password too weak');
    }

    // Success case
    const user = generateMockUser(name, email);
    const accessToken = `fake-jwt-${Date.now()}`;

    return {
        user,
        accessToken,
        message: "Registration successful"
    };
};

// Mock login function (for consistency)
 const mockLogin = async (email, password) => {
    await mockDelay(600);

    // TODO: Add login mock logic
    // For now, just success
    const user = generateMockUser("Mock User", email);
    const accessToken = `fake-jwt-${Date.now()}`;

    return {
        user,
        accessToken,
        message: "Login successful"
    };
};
// Dashboard mock data
export const mockDashboardData = {
    // Stats for cards
    stats: {
        total: 12,
        pending: 5,
        inProgress: 3,
        completed: 4
    },

    // Recent tasks (5 latest)
    recentTasks: [
        {
            id: 1,
            title: "Complete project proposal",
            status: "pending",
            priority: "high",
            dueDate: "2024-07-15",
            createdAt: "2024-07-08"
        },
        {
            id: 2,
            title: "Review code changes",
            status: "in-progress",
            priority: "medium",
            dueDate: "2024-07-10",
            createdAt: "2024-07-07"
        },
        {
            id: 3,
            title: "Update documentation",
            status: "pending",
            priority: "low",
            dueDate: "2024-07-20",
            createdAt: "2024-07-06"
        },
        {
            id: 4,
            title: "Fix responsive issues",
            status: "completed",
            priority: "high",
            dueDate: "2024-07-05",
            createdAt: "2024-07-05"
        },
        {
            id: 5,
            title: "Setup testing environment",
            status: "in-progress",
            priority: "medium",
            dueDate: "2024-07-12",
            createdAt: "2024-07-04"
        }
    ]
};
// Export mock API functions
export const mockAPI = {
    register: mockRegister,
    login: mockLogin,
};