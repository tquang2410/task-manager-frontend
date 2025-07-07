
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
// Export mock API functions
export const mockAPI = {
    register: mockRegister,
    login: mockLogin,
};