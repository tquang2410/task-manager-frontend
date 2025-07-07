import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true,
  });

  // Check if user is logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setAuth({
          isAuthenticated: true,
          user,
          token,
          loading: false,
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Clear invalid data
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userData');
        setAuth({
          isAuthenticated: false,
          user: null,
          token: null,
          loading: false,
        });
      }
    } else {
      setAuth({
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
      });
    }
  }, []);

  const login = (user, token) => {
    // Save to localStorage
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userData', JSON.stringify(user));

    // Update state
    setAuth({
      isAuthenticated: true,
      user,
      token,
      loading: false,
    });
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');

    // Update state
    setAuth({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
    });
  };

  const updateUser = (userData) => {
    // Update localStorage
    localStorage.setItem('userData', JSON.stringify(userData));

    // Update state
    setAuth(prev => ({
      ...prev,
      user: userData,
    }));
  };

  const value = {
    ...auth,
    login,
    logout,
    updateUser,
  };

  return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
  );
};