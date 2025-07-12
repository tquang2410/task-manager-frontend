import LoginForm from '../components/auth/LoginForm';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login to TaskManager</h2>
        <LoginForm onSuccess={() => navigate('/')} />
        <div className="auth-footer">
          <p>Don&apos;t have an account? <Link to="/register">Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
