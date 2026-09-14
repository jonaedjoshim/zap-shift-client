import axios from "axios";
import { useEffect } from "react";

import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL ||
        "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

const useAxiosSecure = () => {
    const { user } = useAuth();

    useEffect(() => {
        const requestInterceptor =
            axiosSecure.interceptors.request.use(
                async (config) => {
                    if (user) {
                        const token =
                            await user.getIdToken();

                        config.headers.Authorization =
                            `Bearer ${token}`;
                    }

                    return config;
                },
                (error) =>
                    Promise.reject(error)
            );

        const responseInterceptor =
            axiosSecure.interceptors.response.use(
                (response) => response,

                (error) => {
                    if (
                        error.response?.status ===
                        401
                    ) {
                        console.error(
                            "Authentication failed or token expired."
                        );
                    }

                    return Promise.reject(
                        error
                    );
                }
            );

        return () => {
            axiosSecure.interceptors.request.eject(
                requestInterceptor
            );

            axiosSecure.interceptors.response.eject(
                responseInterceptor
            );
        };
    }, [user]);

    return axiosSecure;
};

export default useAxiosSecure;