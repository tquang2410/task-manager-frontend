import { Card } from 'antd';
import ProfileForm from '../components/auth/ProfileForm';
import styles from '../styles/components/PageLayout.module.css'
const ProfilePage = () => {
    const handleProfileSuccess = () => {
        console.log('Profile updated successfully!');
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Profile Settings</h1>
                <p>Update your personal information and password</p>
            </div>

            <Card style={{ maxWidth: 600, margin: '0 auto' }}>
                <ProfileForm onSuccess={handleProfileSuccess} />
            </Card>
        </div>
    );
};

export default ProfilePage;