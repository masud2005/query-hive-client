import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import error from '../assets/404.png'

const ErrorPage = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>

            <Helmet>
                <title>404 Page Not Found | Query Hive</title>
            </Helmet>
            {/* <img className='w-[350px] h-[350px] -mt-10' src="https://i.ibb.co.com/60203sF4/404-Error-rafiki-2.png" alt="Error..." /> */}
            <img className='w-[350px] h-[350px] -mt-10' src={error} alt="Error..." />
            {/* <h1 className='text-9xl font-semibold text-gray-500'>404</h1>
            <h2 className='text-5xl font-medium text-gray-500 py-3'>Page Not Found</h2> */}
            <Link to={'/'} className='text-xl -mt-10 text-teal-500 font-bold border border-teal-500 rounded-full px-4 py-1 hover:bg-teal-100 transition duration-300'>Go To Home Page</Link>
        </div>
    );
};

export default ErrorPage;