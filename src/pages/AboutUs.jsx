import React from 'react';

const AboutUs = () => {
    return (
        <section className="container mx-auto my-12 px-2">
            <h1 className="text-3xl font-extrabold text-center text-teal-500 mb-10 -mt-5">
                About <span className="text-indigo-500">QueryHive</span>
            </h1>
            <div className="bg-gradient-to-br from-teal-50 to-indigo-100 rounded p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Who We Are</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                    Welcome to QueryHive, your comprehensive platform for managing and resolving customer queries efficiently. Established in 2022, QueryHive has been dedicated to enhancing customer support services for businesses of all sizes. Our platform is designed to streamline query management, improve customer satisfaction, and boost operational efficiency.
                </p>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                    At QueryHive, our mission is to empower businesses with innovative solutions to handle customer queries swiftly and effectively. We strive to create a seamless experience for both customer support teams and their clients, ensuring every query is addressed with precision and care.
                </p>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Features</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                    QueryHive offers a range of features designed to enhance your customer support operations, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-6">
                    <li>Advanced query tracking and management system.</li>
                    <li>Real-time customer support analytics.</li>
                    <li>Customizable templates for quick responses.</li>
                    <li>Seamless integration with popular CRM platforms.</li>
                </ul>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                    QueryHive stands out for its commitment to innovation, user-friendly interface, and robust support system. Here are a few reasons to choose us:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-6">
                    <li>Intuitive platform designed for ease of use.</li>
                    <li>Scalable solutions to grow with your business.</li>
                    <li>Dedicated support team to assist you at every step.</li>
                    <li>Secure platform with regular updates and enhancements.</li>
                </ul>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
                <p className="text-gray-700 leading-relaxed">
                    If you have any questions or would like to learn more about QueryHive, please reach out to us at <a href="mailto:support@queryhive.com" className="text-teal-600">support@queryhive.com</a>. We're here to help you optimize your customer support experience!
                </p>
            </div>
        </section>
    );
};

export default AboutUs;
