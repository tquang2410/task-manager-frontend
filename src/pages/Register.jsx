import RegisterForm from '../components/auth/RegisterForm';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/components/Auth.module.css'
const RegisterPage = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.authContainer}>
            <div className={styles.authBox}>
                <h2 className={styles.authTitle}>Create Your Account</h2>
                <RegisterForm onSuccess={() => navigate('/')} />
                <div className={styles.authFooter}>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;