import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

const useAxiosSecure = () => {
    const { userLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {
            return response;
        }, error => {

            // console.log("Api response error status: ", error.status);
            if (error.status === 401 || error.status === 403) {
                userLogout()
                    .then(() => {
                        navigate('/login');
                    })
                    .catch(error => {
                        Swal.fire(error);
                    })
            }

            return Promise.reject(error);
        })
    }, [])

    return axiosInstance;
};

export default useAxiosSecure;