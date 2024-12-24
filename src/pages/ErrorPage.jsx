import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <h1 className='text-9xl font-semibold text-gray-500'>404</h1>
            <h2 className='text-5xl font-medium text-gray-500 py-3'>Page Not Found</h2>
            <Link to={'/'} className='text-lg text-purple-700 underline'>Go To Home Page</Link>
        </div>
    );
};

export default ErrorPage;