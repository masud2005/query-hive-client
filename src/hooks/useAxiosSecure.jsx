import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { userLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                const status = error.response?.status;

                if (status === 401) {
                    // 401: Unauthorized
                    Swal.fire({
                        title: 'Unauthorized Access',
                        text: 'You are not authorized to access this resource. Please log in again.',
                        icon: 'error',
                        customClass: {
                            confirmButton: 'bg-teal-400 text-white',
                        },
                    }).then(() => {
                        userLogout()
                            .then(() => {
                                navigate('/login');
                            })
                            .catch((err) => {
                                Swal.fire({
                                    title: 'Logout Failed',
                                    text: err.message,
                                    icon: 'error',
                                    customClass: {
                                        confirmButton: 'bg-red-400 text-white',
                                    },
                                });
                            });
                    });
                } else if (status === 403) {
                    // 403: Forbidden
                    Swal.fire({
                        title: 'Forbidden',
                        text: 'You do not have permission to access this resource.',
                        icon: 'warning',
                        customClass: {
                            confirmButton: 'bg-teal-400 text-white',
                        },
                    }).then(() => {
                        userLogout()
                            .then(() => {
                                navigate('/login');
                            })
                            .catch((err) => {
                                Swal.fire({
                                    title: 'Logout Failed',
                                    text: err.message,
                                    icon: 'error',
                                    customClass: {
                                        confirmButton: 'bg-red-400 text-white',
                                    },
                                });
                            });
                    });
                }

                return Promise.reject(error);
            }
        );
    }, [navigate, userLogout]);

    return axiosInstance;
};

export default useAxiosSecure;