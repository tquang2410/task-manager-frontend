import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
import './styles/global.css'
// import { Provider } from 'react-redux';
// import store from './store';
// Import pages
import DashboardPage from './pages/Dashboard';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import TasksPage from './pages/Tasks';
import ProfilePage from './pages/Profile';

// Import layout components
import Header from './components/layout/Header';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Sidebar from "./components/layout/Sidebar.jsx";


// Ant Design theme config
const theme = {
    token: {
        colorPrimary: '#1890ff',
        borderRadius: 6,
    },
};
const { Content } = Layout;
function App() {
    return (

        <ConfigProvider theme={theme}>
            <Router>
                <div className="app">
                    <Routes>
                        {/* Public routes - no header */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        {/* Protected routes - with header */}
                        <Route path="/*" element={
                            <ProtectedRoute>
                                <Layout style={{ minHeight: '100vh' }}>
                                    <Sidebar />
                                    <Layout>
                                        <Header />
                                        <Content style={{margin: '24px 16px 0', padding: 24, background: '#fff'}}>
                                            <Routes>
                                                <Route path="/" element={<DashboardPage />} />
                                                <Route path="/dashboard" element={<Navigate to="/" replace />} />
                                                <Route path="/tasks" element={<TasksPage />} />
                                                <Route path="/profile" element={<ProfilePage />} />
                                                <Route path="*" element={<Navigate to="/" replace />} />
                                            </Routes>
                                        </Content>
                                    </Layout>
                                </Layout>
                            </ProtectedRoute>
                        } />
                    </Routes>
                </div>
            </Router>
        </ConfigProvider>
    );
}

export default App;