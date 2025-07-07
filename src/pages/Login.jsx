import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const LoginPage = () => {
    const [loading, setLoading] = useState(false);
const navigate = useNavigate();
const { login } = useAuth();
const [form] = Form.useForm();
const onFinish = async (values) => {
    setLoading(true);
    try {
        // Gọi API đăng nhập
        console.log('Login values:', values);
        // Giả lập API đăng nhập thành công
        setTimeout(() => {
            const mockUser = {
                name: 'John Doe',
                email: values.email,
                role: 'user',
            };
            const mockToken = 'mock-jwt-token';
            login(mockUser, mockToken);
            notification.success({
                message: 'Login Successful',
                description: 'Welcome back!',
            });
            navigate('/'); // Điều hướng về trang Dashboard sau khi đăng nhập thành công
            setLoading(false);
        }, 1000);
    }
    catch (error){
        notification.error({
            message: 'Login Failed',
            description: error.message || 'Invalid credentials',
        });
    }
    finally {
        setLoading(false);
    }
};
  return (
   <div className="auth-container">
       <div className="auth-box">
           <h2>Login to TaskManager</h2>
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
              <div className="auth-footer">
                <p>Don&apos;t have an account? <Link to="/register">Register</Link></p>
              </div>
       </div>
   </div>
  );
};

export default LoginPage;
