import axios from 'axios';
import { notification } from 'antd';

// Create axios instance with base configuration
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
    timeout: 10000, // 10 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - runs before every request
axiosInstance.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        const token = localStorage.getItem('accessToken');

        // Add token to headers if exists
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Log request for debugging (remove in production)
        console.log('🚀 API Request:', {
            url: config.url,
            method: config.method,
            data: config.data,
            headers: config.headers,
        });

        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor - runs after every response
axiosInstance.interceptors.response.use(
    (response) => {
        // Log successful response
        console.log('✅ API Response:', {
            url: response.config.url,
            status: response.status,
            data: response.data,
        });

        // Return only data part (cleaner)
        return response.data;
    },
    (error) => {
        console.error('❌ API Error:', error);

        const { response } = error;

        // Handle different error cases
        if (response) {
            const { status, data } = response;

            switch (status) {
                case 401: {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('userData');

                    // Check if already on login/register page
                    const currentPath = window.location.pathname;
                    if (currentPath === '/login' || currentPath === '/register') {
                        // Let component handle login errors
                        return Promise.reject(data);
                    } else {
                        // Session expired on authenticated pages
                        notification.error({
                            message: 'Session Expired',
                            description: 'Please login again',
                        });
                        window.location.href = '/login';
                    }
                    break;
                }

                case 403:
                    // Forbidden - insufficient permissions
                    notification.error({
                        message: 'Access Denied',
                        description: 'You do not have permission to perform this action',
                    });
                    break;

                case 404:
                    // Not found
                    notification.error({
                        message: 'Not Found',
                        description: 'The requested resource was not found',
                    });
                    break;

                case 422:
                    // Validation error
                    notification.error({
                        message: 'Validation Error',
                        description: data.message || 'Please check your input data',
                    });
                    break;

                case 500:
                    // Server error
                    notification.error({
                        message: 'Server Error',
                        description: 'Something went wrong on our end. Please try again later.',
                    });
                    break;

                default:
                    // Generic error
                    notification.error({
                        message: 'Request Failed',
                        description: data.message || 'An unexpected error occurred',
                    });
            }

            // Return error data for component handling
            return Promise.reject(data);
        } else if (error.request) {
            // Network error - no response received
            notification.error({
                message: 'Network Error',
                description: 'Unable to connect to server. Please check your connection.',
            });
            return Promise.reject({
                message: 'Network error',
                type: 'NETWORK_ERROR',
            });
        } else {
            // Something else happened
            notification.error({
                message: 'Error',
                description: error.message || 'An unexpected error occurred',
            });
            return Promise.reject({
                message: error.message,
                type: 'UNKNOWN_ERROR',
            });
        }
    }
);

export default axiosInstance;