import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-teal-200 to-indigo-200 py-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between gap-8 px-2">
                {/* Column 1 */}
                <div className='text-gray-700 md:max-w-[300px] lg:max-w-[400px] 2xl:max-w-[576px]'>
                    <div className='flex items-center mb-5'>
                        <img className='w-20' src="https://i.ibb.co.com/gLs0R7Wy/querypng-removebg-preview.png" alt="Logo..." />
                        {/* <h4 className="text-3xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-teal-500  to-indigo-500 text-transparent bg-clip-text">QueryHive</h4> */}
                        <h4 className="text-3xl font-bold text-gray-800 ">QueryHive</h4>
                    </div>
                    <p>
                        Your go-to platform for product recommendations and alternative solutions.
                        Collaborate, suggest, and make informed decisions effortlessly.
                    </p>
                </div>
                {/* Column 2 */}
                <div>
                    <h4 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h4>
                    <ul className='text-gray-700'>
                        <li>Email: support@queryhive.com</li>
                        <li>Phone: +880 123 456 789</li>
                        <li>Address: 45 Hive Street, Dhaka, Bangladesh</li>
                    </ul>
                </div>
                {/* Column 3 */}
                <div>
                    <h4 className="text-3xl font-bold text-gray-800 mb-4">Follow Us</h4>
                    <ul className="flex space-x-4 text-gray-700 flex-wrap">
                        <li className="bg-white hover:bg-gray-100 transition duration-300 rounded-full p-2">
                            <a href="https://www.facebook.com/MasudRana2005" target="_blank" rel="noreferrer">
                                <FaFacebook size={24} />
                            </a>
                        </li>
                        <li className="bg-white hover:bg-gray-100 transition duration-300 rounded-full p-2">
                            <a href="https://www.linkedin.com/in/masud-rana2005/" target="_blank" rel="noreferrer">
                                <FaLinkedin size={24} />
                            </a>
                        </li>
                        <li className="bg-white hover:bg-gray-100 transition duration-300 rounded-full p-2">
                            <a href="https://github.com/masud2005" target="_blank" rel="noreferrer">
                            <FaGithub size={24} />
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
            <div className="text-center mt-8 border-t border-gray-400 pt-4">
                <span className='text-gray-700'>© {new Date().getFullYear()} QueryHive. Design by </span>
                <span className='text-gray-900 font-semibold font-serif'>Masud Rana</span>
            </div>
        </footer>
    );
};

export default Footer;