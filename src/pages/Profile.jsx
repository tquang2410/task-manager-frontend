import { useState } from 'react';
import { Form, Input, Button, Card, message, Divider } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import {authAPI} from "../utils/api.js";

const ProfilePage = () => {
    const { user, updateUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    // Handle form submission
    const handleSubmit = async (values) => {
        setLoading(true);

        try {
            // Call API to update user profile
            const response = await authAPI.updateProfile({
                name: values.name
            });
            // Update user info từ API response
            updateUser(response.user);
            message.success('Profile updated successfully!');

            // Clear password fields after success
            form.setFieldsValue({
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            });

        } catch (error) {
            message.error('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Profile Settings</h1>
                <p>Update your personal information and password</p>
            </div>

            <Card style={{ maxWidth: 600, margin: '0 auto' }}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{
                        name: user?.name || '',
                        email: user?.email || ''
                    }}
                    size="large"
                >
                    {/* Basic Information Section */}
                    <h3>Basic Information</h3>

                    <Form.Item
                        name="name"
                        label="Full Name"
                        rules={[
                            { required: true, message: 'Please enter your name!' },
                            { min: 2, message: 'Name must be at least 2 characters!' },
                            { max: 50, message: 'Name must be less than 50 characters!' }
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Enter your full name"
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email Address"
                        rules={[
                            { required: true, message: 'Please enter your email!' },
                            { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Enter your email"
                        />
                    </Form.Item>

                    <Divider />

                    {/* Password Change Section */}
                    <h3>Change Password (Optional)</h3>
                    <p style={{ color: '#666', marginBottom: 16 }}>
                        Leave blank if you don&apos;t want to change your password
                    </p>

                    <Form.Item
                        name="oldPassword"
                        label="Current Password"
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    // Only require old password if new password is entered
                                    if (getFieldValue('newPassword') && !value) {
                                        return Promise.reject(new Error('Please enter your current password!'));
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Enter current password"
                        />
                    </Form.Item>

                    <Form.Item
                        name="newPassword"
                        label="New Password"
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    // Only require new password if old password is entered
                                    if (getFieldValue('oldPassword') && !value) {
                                        return Promise.reject(new Error('Please enter a new password!'));
                                    }
                                    if (value && value.length < 6) {
                                        return Promise.reject(new Error('Password must be at least 6 characters!'));
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Enter new password"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Confirm New Password"
                        dependencies={['newPassword']}
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    const newPassword = getFieldValue('newPassword');

                                    // Only require confirm if new password is entered
                                    if (newPassword && !value) {
                                        return Promise.reject(new Error('Please confirm your new password!'));
                                    }

                                    // Check if passwords match
                                    if (value && newPassword !== value) {
                                        return Promise.reject(new Error('Passwords do not match!'));
                                    }

                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Confirm new password"
                        />
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item style={{ marginTop: 32 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            size="large"
                            style={{ width: '100%' }}
                        >
                            {loading ? 'Updating...' : 'Update Profile'}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default ProfilePage;