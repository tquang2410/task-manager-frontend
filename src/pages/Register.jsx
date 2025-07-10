import RegisterForm from '../components/auth/RegisterForm';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Create Your Account</h2>
                <RegisterForm onSuccess={() => navigate('/')} />
                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;