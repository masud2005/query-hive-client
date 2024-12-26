import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import { nav } from 'framer-motion/client';
import { Helmet } from 'react-helmet-async';

const Register = () => {
    const { user, loginWithGoogle, createNewUser, updateProfileInfo } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false)
    // console.log(user);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(name, photo, email, password);

        // Password Validation
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordPattern.test(password)) {
            return Swal.fire({
                icon: 'error',
                title: 'Password Error',
                text: 'Password must contain at least 6 characters, including UPPER/lowercase letters.',
                customClass: {
                    confirmButton: 'bg-red-400 text-white'
                }
            });
            return;
        }

        createNewUser(email, password)
            .then(result => {
                // console.log(result);
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: `Welcome, ${result.user?.displayName || 'User'}! Your account has been created.`,
                    customClass: {
                        confirmButton: 'bg-teal-400 text-white'
                    }
                });
                updateProfileInfo(name, photo);
                navigate('/');
            })
            .catch(error => {
                // console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: error.code,
                    customClass: {
                        confirmButton: 'bg-red-400 text-white'
                    }
                });
            })
    }

    const handleLoginWithGoogle = () => {
        loginWithGoogle()
            .then(result => {
                // console.log(result);
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: `Welcome, ${result.user?.displayName || 'User'}! Your account has been created.`,
                    customClass: {
                        confirmButton: 'bg-teal-400 text-white'
                    }
                });
                navigate('/');
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: error.code,
                    customClass: {
                        confirmButton: 'bg-red-400 text-white'
                    }
                });
            })
    }

    return (
        <div className="flex items-center justify-center my-10 px-2">

            <Helmet>
                <title>Register | Query Hive</title>
            </Helmet>

            <div className="bg-white shadow-xl rounded-lg w-full max-w-xl px-5 md:px-8 py-10 border ">
                <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-500 to-teal-500 text-transparent bg-clip-text mb-6 p-1">
                    Register Your Account
                </h1>
                <form onSubmit={handleRegister} className="space-y-6">
                    {/* Name Field */}
                    <div className="form-control">
                        <label className="label text-lg font-medium text-gray-700">Your Name</label>
                        <input type="text" name="name" placeholder="Enter your name" className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition" required />
                    </div>

                    {/* Photo URL Field */}
                    <div className="form-control">
                        <label className="label text-lg font-medium text-gray-700">Photo URL</label>
                        <input type="text" name="photo" placeholder="Enter your photo URL" className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition" required/>
                    </div>

                    {/* Email Field */}
                    <div className="form-control">
                        <label className="label text-lg font-medium text-gray-700">Email Address</label>
                        <input type="email" name="email" placeholder="Enter your email address" className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition" required />
                    </div>

                    {/* Password Field */}
                    <div className="form-control relative">
                        <label className="label text-lg font-medium text-gray-700">Password</label>
                        <input type={`${showPassword ? 'text' : 'password'}`} name="password" placeholder="Enter your password" className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition" required/>
                        <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 bottom-[10px] text-gray-600 bg-gray-100 rounded-full cursor-pointer p-1"> {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />} </span>
                    </div>

                    {/* Terms & Conditions */}
                    <label className=" flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="checkbox checkbox-md border-gray-300" />
                        <span className="text-base text-gray-600">Accept Terms & Conditions</span>
                    </label>

                    {/* Register Button */}
                    <div className="form-control">
                        <button className="btn w-full py-2 bg-indigo-500 text-white text-base rounded-md hover:bg-indigo-600 transition"> Register </button>
                    </div>
                </form>

                {/* Login with Google */}
                <button onClick={handleLoginWithGoogle} className="btn w-full mt-6 py-2 bg-teal-400 text-base rounded-md hover:bg-teal-500 transition flex items-center justify-center"><FaGoogle /> Login with Google</button>

                {/* Redirect to Login */}
                <p className="text-center text-base font-medium text-gray-600 mt-3">Already have an account?{' '}<Link to="/login" className="text-teal-600 hover:underline">Login Now</Link></p>
            </div>
        </div>
    );

};

export default Register;