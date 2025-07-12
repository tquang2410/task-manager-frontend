import { Card } from 'antd';
import ProfileForm from '../components/auth/ProfileForm';

const ProfilePage = () => {
    const handleProfileSuccess = () => {
        // Optional: Add any page-level logic after successful update
        console.log('Profile updated successfully!');
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Profile Settings</h1>
                <p>Update your personal information and password</p>
            </div>

            <Card style={{ maxWidth: 600, margin: '0 auto' }}>
                <ProfileForm onSuccess={handleProfileSuccess} />
            </Card>
        </div>
    );
};

export default ProfilePage;