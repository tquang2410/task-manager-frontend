import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
import './styles/global.css'
import DashboardPage from './pages/Dashboard';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import TasksPage from './pages/Tasks';
import ProfilePage from './pages/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { closeGachaModal, openModal } from './store/slices/taskSlice';
import GachaModal from './components/common/GachaModal';


// Import layout components
import Header from './components/layout/Header';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Sidebar from "./components/layout/Sidebar.jsx";
import TaskModal from './components/tasks/TaskModal';

// Ant Design theme config
const theme = {
    token: {
        colorPrimary: '#1890ff',
        borderRadius: 6,
    },
};
const { Content } = Layout;

function App() {
    const dispatch = useDispatch();
    const { isGachaModalOpen, gachaResults } = useSelector(state => state.tasks);

    // Hàm này sẽ mở TaskModal với dữ liệu của task được chọn
    const handleTaskSelect = (task) => {
        dispatch(openModal(task));
    };

    const handleCloseGachaModal = () => {
        dispatch(closeGachaModal());
    };

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
                <GachaModal
                    isOpen={isGachaModalOpen}
                    onClose={handleCloseGachaModal}
                    tasks={gachaResults}
                    onTaskSelect={handleTaskSelect}
                />
                <TaskModal />
            </Router>
        </ConfigProvider>
    );
}

export default App;