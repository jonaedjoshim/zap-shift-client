// hooks/useAxiosSecure.js
import { useEffect } from 'react';
import axios from 'axios';
import useAuth from './useAuth';

const useAxiosSecure = () => {
    const { token } = useAuth(); // your auth hook

    const axiosSecure = axios.create({
        baseURL: 'https://your-api-domain.com',  // backend API base url
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // attach token dynamically
    axiosSecure.interceptors.request.use(config => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    axiosSecure.interceptors.response.use(
        response => response,
        error => {
            console.error('Axios error:', error.response?.data || error.message);
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;