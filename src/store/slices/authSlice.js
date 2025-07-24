import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const {user, token} = action.payload;
            // Save to localStorage
            localStorage.setItem('accessToken', token);
            localStorage.setItem('userData', JSON.stringify(user));
            state.isAuthenticated = true;
            state.user = user;
            state.token = token;
            state.loading = false;
        },
        logout: (state) => {
            // Clear localStorage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userData');
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.loading = false;
        },
        updateUser: (state, action) => {
            localStorage.setItem('userData', JSON.stringify(action.payload));
            state.user = { ...state.user, ...action.payload,
                _updateAt: Date.now()
            };
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        // Thêm vào reducers object:
        initializeAuth: (state) => {
            const token = localStorage.getItem('accessToken');
            const userData = localStorage.getItem('userData');

            if (token && userData) {
                try {
                    const user = JSON.parse(userData);
                    state.isAuthenticated = true;
                    state.user = {
                        ...user,
                        avatarId: user.avatarId || 1,
                    };
                    state.token = token;
                    state.loading = false;
                } catch (error) {
                    console.error('Error parsing user data:', error);
                    // Clear invalid data
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('userData');
                    state.isAuthenticated = false;
                    state.user = null;
                    state.token = null;
                    state.loading = false;
                }
            } else {
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                state.loading = false;
            }
        },
    },
});
export const { loginSuccess, logout, updateUser, setLoading, initializeAuth } = authSlice.actions;
export default authSlice.reducer;