import { useState, useEffect } from 'react';
import { Form, Input, Button, Divider, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../utils/api';
import {AVATARS, getAvatarById} from "../../utils/avatars.js";
import PropTypes from 'prop-types';

const ProfileForm = ({ onSuccess }) => {
    const { user, updateUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(1);
    const [form] = Form.useForm();

    // Load profile data when component mounts
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const response = await authAPI.getProfile();
                setSelectedAvatar(response.user.avatarId || 1);
                form.setFieldsValue({
                    name: response.user.name,
                    email: response.user.email
                });
            } catch (error) {
                message.error('Failed to load profile');
            }
        };
        loadProfile();
    }, [form]);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            // Update profile
            const response = await authAPI.updateProfile({
                name: values.name,
                avatarId: selectedAvatar
            });
            updateUser(response.user);

            // Update password if provided
            if (values.oldPassword && values.newPassword) {
                await authAPI.updatePassword(values.oldPassword, values.newPassword);

                // Clear password fields
                form.setFieldsValue({
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });

                message.success('Profile and password updated successfully!');
            } else {
                message.success('Profile updated successfully!');
            }

            if (onSuccess) onSuccess();

        } catch (error) {
            message.error(error.EM || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
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
            {/* Avatar Selection */}
            <Form.Item label="Avatar">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginTop: '10px' }}>
                    {AVATARS.map(avatar => (
                        <div
                            key={avatar.id}
                            onClick={() => setSelectedAvatar(avatar.id)}
                            style={{
                                padding: '8px',
                                border: selectedAvatar === avatar.id ? '3px solid #1890ff' : '2px solid #d9d9d9',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                textAlign: 'center',
                                backgroundColor: selectedAvatar === avatar.id ? '#f0f8ff' : 'white',
                                transition: 'all 0.2s'
                            }}
                        >
                            <img
                                src={avatar.src}
                                alt={avatar.name}
                                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                            />
                            <div style={{ fontSize: '12px', marginTop: '4px', color: '#666' }}>
                                {avatar.name}
                            </div>
                        </div>
                    ))}
                </div>
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
                            if (newPassword && !value) {
                                return Promise.reject(new Error('Please confirm your new password!'));
                            }
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
    );
};

ProfileForm.propTypes = {
    onSuccess: PropTypes.func,
};

export default ProfileForm;