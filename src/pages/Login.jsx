import LoginForm from '../components/auth/LoginForm';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/components/Auth.module.css'
const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <h2 className={styles.authTitle}>Login to TaskManager</h2>
        <LoginForm onSuccess={() => navigate('/')} />
        <div className={styles.authFooter}>
          <p>Don&apos;t have an account? <Link to="/register">Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
