import { useContext, useEffect, useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const Navbar = () => {
    const { user, userLogout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false)

    const handleLogout = () => {
        // console.log('Logout');
        userLogout()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Logged Out Successfully!',
                    text: 'You have been logged out. See you soon!',
                    customClass: {
                        confirmButton: 'bg-teal-400 text-white'
                    }
                });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Logout Failed',
                    text: `Something went wrong: ${error.code}. Please try again.`,
                    customClass: {
                        confirmButton: 'bg-red-400 text-white'
                    }
                });
            })
    };

    // Theme Loaded localStorage 
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, []);

    // Theme Changes
    const toggleTheme = () => {
        const newTheme = !isDarkMode ? 'dark' : 'light';
        setIsDarkMode(!isDarkMode);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <nav className="h-[90px] place-content-center">
            <div className="container mx-auto flex justify-between items-center  py-4 px-2">
                <Link to={'/'} className="flex items-center">
                    <img className="w-16 " src="https://i.ibb.co.com/gLs0R7Wy/querypng-removebg-preview.png" alt="" />
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-500  to-indigo-500 text-transparent bg-clip-text">QueryHive</h1>
                </Link>

                {/* Center Section: Navigation Links */}
                <div className="hidden xl:flex items-center gap-6 ">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'text-base hover:text-indigo-600'}>Home</NavLink>
                    <NavLink to="/queries" className={({ isActive }) => isActive ? 'text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'text-base hover:text-indigo-600'}>Queries</NavLink>
                    {
                        user && <>
                            <NavLink to="/recommendations-for-me" className={({ isActive }) => isActive ? 'text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'text-base hover:text-indigo-600'}>Recommendations For Me</NavLink>
                            <NavLink to="/my-queries" className={({ isActive }) => isActive ? 'text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'text-base hover:text-indigo-600'}>My Queries</NavLink>
                            <NavLink to="/my-recommendations" className={({ isActive }) => isActive ? 'text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'text-base hover:text-indigo-600'}>My recommendations</NavLink>
                        </>
                    }
                    <NavLink to="/about-us" className={({ isActive }) => isActive ? 'text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'text-base hover:text-indigo-600'}>About Us</NavLink>
                    <NavLink to="/contact-us" className={({ isActive }) => isActive ? 'text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'text-base hover:text-indigo-600'}>Contact Us</NavLink>
                </div>

                {/* Right Section: Login/Logout Buttons */}
                <div className="hidden xl:flex gap-3 items-center">
                    <button
                        onClick={toggleTheme}
                        className={`w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 shadow-md transition-transform transform hover:scale-110`}
                    >
                        {isDarkMode ? (
                            <MdOutlineLightMode size={24} />
                        ) : (
                            <MdOutlineDarkMode size={24} />
                        )}
                    </button>
                    <div className='flex gap-8 items-center'>
                        {
                            user ?
                                <div className="flex items-center gap-3">
                                    <div>
                                        <img data-tooltip-id="my-tooltip-1" className="rounded-full w-[48px] h-[48px] border border-teal-600 shadow-md transition-transform transform hover:scale-110" src={user?.photoURL || 'https://img.icons8.com/?size=48&id=z-JBA_KtSkxG&format=png'} alt="" />
                                    </div>
                                    <button onClick={handleLogout} className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition">Log Out</button>
                                </div>
                                :
                                <NavLink to="/login" className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition">Login</NavLink>
                        }
                    </div>
                </div>

                {/* Hamburger Menu for Mobile */}
                <div onClick={() => setMenuOpen(!menuOpen)} className="xl:hidden bg-gradient-to-r from-indigo-300 to-teal-300 p-2 rounded-md text-2xl cursor-pointer">
                    {menuOpen ? <IoMdClose /> : <IoMdMenu />}
                </div>
            </div>

            {/* React Tooltip */}
            <Tooltip
                id="my-tooltip-1"
                place="bottom"
                variant="info"
                content={user?.displayName || 'Anonymous User'}
                className="z-50"
            />

            {/* Mobile Menu */}
            <button
                onClick={toggleTheme}
                className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 shadow-md transition-transform transform hover:scale-110 absolute top-6 right-14 xl:hidden`}
            >
                {isDarkMode ? (
                    <MdOutlineLightMode size={24} />
                ) : (
                    <MdOutlineDarkMode size={24} />
                )}
            </button>
            <div className={`${menuOpen ? 'left-0' : '-left-[100%]'} absolute duration-500 w-full bg-gray-50/95`}>
                <div className={`flex-col xl:hidden gap-4 py-4 px-4`}>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}>Home</NavLink>
                    <NavLink to="/queries" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}>Queries</NavLink>
                    {
                        user && <>
                            <NavLink to="/recommendations-for-me" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}>Recommendations For Me</NavLink>
                            <NavLink to="/my-queries" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}>My Queries</NavLink>
                            <NavLink to="/my-recommendations" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}>My Recommendations</NavLink>
                        </>
                    }
                    <NavLink to="/about-us" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}>About Us</NavLink>
                    <NavLink to="/contact-us" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}>Contact Us</NavLink>


                    <div className='flex gap-10 justify-around pt-5 mt-4 border-t-2'>
                        {
                            user ?
                                <div className="flex items-center gap-3">
                                    <div>
                                        <img data-tooltip-id="my-tooltip-1" className="rounded-full w-[52px] h-[52px] border border-teal-600 shadow-md transition-transform transform hover:scale-110" src={user?.photoURL || 'https://img.icons8.com/?size=48&id=z-JBA_KtSkxG&format=png'} alt="" />
                                    </div>
                                    <button onClick={handleLogout} className='bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition'>Logout</button>
                                </div>
                                :
                                <NavLink to="/login" className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition" onClick={() => setMenuOpen(false)}>Login</NavLink>
                        }

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;