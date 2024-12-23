import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-teal-200 to-indigo-200 py-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
                {/* Column 1 */}
                <div className='text-gray-700'>
                    <h4 className="text-3xl font-bold text-gray-800 mb-4">QueryHive</h4>
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
                    <ul className="flex space-x-4 text-gray-700">
                        <li>
                            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                                <i className="fab fa-facebook-f"></i> Facebook
                            </a>
                        </li>
                        <li>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                                <i className="fab fa-linkedin"></i> LinkedIn
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer">
                                <i className="fab fa-twitter"></i> Twitter
                            </a>
                        </li>
                        <li>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer">
                                <i className="fab fa-instagram"></i> Instagram
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
