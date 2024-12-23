import { useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className="h-[90px] place-content-center">
            <div className="container mx-auto flex justify-between items-center  py-4 px-2">
                {/* Left Section: Logo */}
                <div className="flex items-center">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-teal-500 text-transparent bg-clip-text">QueryHive</h1>
                </div>

                {/* Center Section: Navigation Links */}
                <div className="hidden lg:flex items-center gap-6">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'text-base hover:text-indigo-600'}>Home</NavLink>
                    <NavLink to="/queries" className={({ isActive }) => isActive ? 'text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'text-base hover:text-indigo-600'}>Queries</NavLink>
                    {/* {
                        user && <>
                            <NavLink to="/add-equipment" className={({ isActive }) => isActive ? 'text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'text-base hover:text-indigo-600'}>Add Equipment</NavLink>
                            <NavLink to="/my-equipment-list" className={({ isActive }) => isActive ? 'text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'text-base hover:text-indigo-600'}>My Equipment List</NavLink>
                        </>
                    } */}
                </div>

                {/* Right Section: Login/Register Buttons */}
                <div className="hidden lg:flex gap-3 items-center">
                    <div className='flex gap-8 items-center'>
                        <NavLink to="/login" className={({ isActive }) => isActive ? 'text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'text-base hover:text-indigo-600'}>Login</NavLink>
                        {/* <NavLink to="/register" className={({ isActive }) => isActive ? 'text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'text-base hover:text-indigo-600'}>Register</NavLink> */}
                    </div>
                </div>

                {/* Hamburger Menu for Mobile */}
                <div onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden bg-gradient-to-r from-indigo-300 to-teal-300 p-2 rounded-md text-2xl cursor-pointer">
                    {menuOpen ? <IoMdClose /> : <IoMdMenu />}
                </div>
            </div>


            {/* Mobile Menu */}
            <div className={`${menuOpen ? 'left-0' : '-left-[100%]'} absolute duration-500 w-full bg-gray-50/95`}>
                <div className={`flex-col lg:hidden gap-4 py-4 px-4`}>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}>Home</NavLink>
                    <NavLink to="/queries" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}>Queries</NavLink>
                    {/* <NavLink to="/add-equipment" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}>Add Equipment</NavLink>
                    <NavLink to="/my-equipment-list" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'block text-base hover:text-teal-600 pt-2'} onClick={() => setMenuOpen(false)}>My Equipment List</NavLink> */}

                    <div className='flex gap-10 justify-around pt-5 mt-4 border-t-2'>
                        <NavLink to="/login" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'block text-base hover:text-teal-600'} onClick={() => setMenuOpen(false)}>Login</NavLink>
                        {/* {
                            user ? <div className="flex items-center gap-3">
                                <div>
                                    <img data-tooltip-id="my-tooltip-1" className="rounded-full w-14 h-14 border border-teal-600 shadow-md transition-transform transform hover:scale-110" src={user?.photoURL || 'https://img.icons8.com/?size=48&id=z-JBA_KtSkxG&format=png'} alt="" />
                                </div>
                                <button onClick={handleLogOut} className="btn border-teal-600 bg-gradient-to-r from-indigo-300 to-teal-300 hover:from-indigo-400 hover:to-teal-400 text-gray-800 hover:border-indigo-600 rounded-xl transition-colors duration-500 text-base">Log Out</button>
                            </div> :
                                <div className='flex gap-10'>
                                    <NavLink to="/login" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'block text-base hover:text-teal-600'} onClick={() => setMenuOpen(false)}>Login</NavLink>
                                    <NavLink to="/register" className={({ isActive }) => isActive ? 'block text-lg font-semibold border-b-2 border-indigo-600 text-teal-600' : 'block text-base hover:text-teal-600'} onClick={() => setMenuOpen(false)}>Register</NavLink>
                                </div>
                        } */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;