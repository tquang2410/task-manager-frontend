import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AuthProvider } from './context/AuthContext';
import './styles/global.css';

// Import pages
import DashboardPage from './pages/Dashboard';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import TasksPage from './pages/Tasks';
import ProfilePage from './pages/Profile';

// Import layout components
import Header from './components/layout/Header';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Ant Design theme config
const theme = {
    token: {
        colorPrimary: '#1890ff',
        borderRadius: 6,
    },
};

function App() {
    return (
        <ConfigProvider theme={theme}>
            <AuthProvider>
                <Router>
                    <div className="app">
                        <Routes>
                            {/* Public routes - no header */}
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />

                            {/* Protected routes - with header */}
                            <Route path="/*" element={
                                <ProtectedRoute>
                                <div className="app-layout">
                                    <Header />
                                    <main className="app-content">
                                        <Routes>
                                            <Route path="/" element={<DashboardPage />} />
                                            <Route path="/dashboard" element={<Navigate to="/" replace />} />
                                            <Route path="/tasks" element={<TasksPage />} />
                                            <Route path="/profile" element={<ProfilePage />} />
                                            <Route path="*" element={<Navigate to="/" replace />} />
                                        </Routes>
                                    </main>
                                </div>
                                </ProtectedRoute>
                            } />
                        </Routes>
                    </div>
                </Router>
            </AuthProvider>
        </ConfigProvider>
    );
}

export default App;