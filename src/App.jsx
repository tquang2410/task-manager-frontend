import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AuthProvider } from './context/AuthContext';
import './styles/global.css';

// Import pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import Profile from './pages/Profile';

// Import layout components
import Header from './components/layout/Header';

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
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />

                            {/* Protected routes - with header */}
                            <Route path="/*" element={
                                <div className="app-layout">
                                    <Header />
                                    <main className="app-content">
                                        <Routes>
                                            <Route path="/" element={<Dashboard />} />
                                            <Route path="/dashboard" element={<Navigate to="/" replace />} />
                                            <Route path="/tasks" element={<Tasks />} />
                                            <Route path="/profile" element={<Profile />} />
                                            <Route path="*" element={<Navigate to="/" replace />} />
                                        </Routes>
                                    </main>
                                </div>
                            } />
                        </Routes>
                    </div>
                </Router>
            </AuthProvider>
        </ConfigProvider>
    );
}

export default App;