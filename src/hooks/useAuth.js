import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout, updateUser, setLoading, initializeAuth} from "../store/slices/authSlice.js";
import { authAPI} from "../utils/api.js";
import { useEffect } from 'react';
const useAuth = () => {
    const dispatch = useDispatch();
    const { user, isAuthenticated, token, loading } = useSelector((state) => state.auth);
    useEffect(() => {
        // Initialize auth state from localStorage
        dispatch(initializeAuth());
    }, [dispatch]);
    const handleLogin = async (email, password) => {
        try {
            dispatch(setLoading(true));
            const response = await authAPI.login(email, password);
            if (!response.success) {
                throw response;
            }
            dispatch(loginSuccess({
                user: response.user,
                token: response.accessToken
            }));
        } catch (error) {
            console.log('Login error:', error);
            dispatch(setLoading(false));
            throw error;
        }
    };
    const handleLogout = () => {
        dispatch(logout());
    };
    const handleUpdateUser = (userData) => {
        dispatch(updateUser(userData));
    };
    console.log('🔍 Auth state:', { isAuthenticated, loading, user: user?.name });
    return {
        user,
        isAuthenticated,
        token,
        loading,
        login: handleLogin,
        logout: handleLogout,
        updateUser: handleUpdateUser
    };
};
export default useAuth;