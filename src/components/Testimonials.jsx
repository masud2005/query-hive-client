import React from "react";
import { motion } from "framer-motion";

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "John Doe",
            feedback: "QueryHive is fantastic! I found exactly what I needed.",
            photo: "https://i.ibb.co/VvGfWhM/images-4.jpg",
        },
        {
            id: 2,
            name: "Jane Smith",
            feedback: "Amazing platform with helpful insights and a great community.",
            photo: "https://i.ibb.co/VjPWcvz/images-5.jpg",
        },
        {
            id: 3,
            name: "Alex Johnson",
            feedback: "Highly recommend QueryHive for all your queries!",
            photo: "https://i.ibb.co.com/Tk1VSXW/download.jpg",
        },
        {
            id: 4,
            name: "Sarah Parker",
            feedback: "Great user experience and support team. Very impressed!",
            photo: "https://i.ibb.co.com/t4p7S6c/download.jpg",
        },
        {
            id: 5,
            name: "Michael Lee",
            feedback: "The recommendations are spot on and helpful.",
            photo: "https://i.ibb.co/1L6m2g4/images-6.jpg",
        },
        {
            id: 6,
            name: "Emily Davis",
            feedback: "I’ve found this platform extremely useful for my research.",
            photo: "https://i.ibb.co.com/sg18MLD/download-1.jpg",
        },
    ];

    return (
        <section className="container mx-auto px-2 md:px-5 pt-5 space-y-10 bg-gradient-to-b from-indigo-50 to-white mt-14 mb-10">
            {/* Section Header */}
            <div className="text-center mb-12 px-5 ">
                <h2 className="text-4xl font-extrabold text-teal-500 mb-4">
                    What Our <span className="text-indigo-500">Users Say</span>
                </h2>
                <p className="text-lg text-gray-900">
                    Discover how QueryHive has helped our community achieve their goals.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {testimonials.map((testimonial) => (
                    <motion.div
                        key={testimonial.id}
                        className="p-6 bg-white rounded-xl shadow-xl border border-gray-200 transform hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                        <div className="flex flex-col items-center space-y-4">
                            <motion.img
                                src={testimonial.photo}
                                alt={testimonial.name}
                                className="w-20 h-20 rounded-full border-4 border-indigo-200 shadow-md"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    transition: { duration: 2, repeat: Infinity },
                                }}
                            />
                            <h3
                                className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
                            >
                                {testimonial.name}
                            </h3>
                            <p className="text-center text-gray-700">{testimonial.feedback}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
