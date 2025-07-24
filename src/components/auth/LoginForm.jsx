import { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import useAuth from '../../hooks/useAuth';
import PropTypes from 'prop-types';

const LoginForm = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);

      notification.success({
        message: 'Login Successful',
        description: 'Welcome back!',
      });

      // Force redirect sau khi login thành công
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 100);

    } catch (error) {
      notification.error({
        message: 'Login Failed',
        description: error.EM || error.message || 'Invalid credentials',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
      <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
      >
        <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
        >
          <Input
              prefix={<UserOutlined />}
              placeholder="Enter your email"
          />
        </Form.Item>
        <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
        >
          <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
          />
        </Form.Item>
        <Form.Item>
          <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="btn-full-width"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Form.Item>
      </Form>
  );
};

LoginForm.propTypes = {
  onSuccess: PropTypes.func,
};

export default LoginForm;