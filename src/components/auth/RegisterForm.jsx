import { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import useAuth from "../../hooks/useAuth.js";
import { authAPI } from '../../utils/api';
import PropTypes from 'prop-types';

const RegisterForm = ({ onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await authAPI.register(values.name, values.email, values.password);
            if (response.accessToken) {
                login(response.user, response.accessToken);
                notification.success({
                    message: 'Registration Successful',
                    description: `Welcome to TaskManager, ${response.user.name}!`,
                });
                if (onSuccess) onSuccess();
            }
        } catch (error) {
            notification.error({
                message: 'Registration Failed',
                description: error.EM || error.message || 'Something went wrong. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
            size="large"
        >
            <Form.Item
                name="name"
                label="Full Name"
                rules={[
                    { required: true, message: 'Please input your full name!' },
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
                label="Email"
                rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email!' }
                ]}
            >
                <Input
                    prefix={<MailOutlined />}
                    placeholder="Enter your email"
                />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    { required: true, message: 'Please input your password!' },
                    { min: 6, message: 'Password must be at least 6 characters!' },
                    {
                        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/,
                        message: 'Password must contain at least one letter and one number!'
                    }
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Enter your password"
                />
            </Form.Item>

            <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={['password']}
                rules={[
                    { required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Passwords do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Confirm your password"
                />
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="btn-full-width"
                >
                    {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
            </Form.Item>
        </Form>
    );
};

RegisterForm.propTypes = {
    onSuccess: PropTypes.func,
};

export default RegisterForm;
