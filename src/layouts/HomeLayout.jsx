import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const HomeLayout = () => {
    return (
        <div>
            {/* Header */}
            <header className='sticky top-0 z-50 shadow-lg bg-opacity-60 backdrop-blur-md h-[90px] '>
                <Navbar />
            </header>

            {/* Main Section */}
            <main className='min-h-[calc(100vh-369px)]'>
                <Outlet />
            </main>

            {/* Footer */}
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default HomeLayout;