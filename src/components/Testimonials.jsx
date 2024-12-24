import React from "react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      feedback: "QueryHive is fantastic! I found exactly what I needed.",
      photo: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Jane Smith",
      feedback: "Amazing platform with helpful insights and a great community.",
      photo: "https://via.placeholder.com/100",
    },
    {
      id: 3,
      name: "Alex Johnson",
      feedback: "Highly recommend QueryHive for all your queries!",
      photo: "https://via.placeholder.com/100",
    },
    {
      id: 4,
      name: "Sarah Parker",
      feedback: "Great user experience and support team. Very impressed!",
      photo: "https://via.placeholder.com/100",
    },
    {
      id: 5,
      name: "Michael Lee",
      feedback: "The recommendations are spot on and helpful.",
      photo: "https://via.placeholder.com/100",
    },
    {
      id: 6,
      name: "Emily Davis",
      feedback: "I’ve found this platform extremely useful for my research.",
      photo: "https://via.placeholder.com/100",
    },
  ];

  return (
    <section className="container mx-auto p-6 space-y-10 bg-gradient-to-b from-indigo-50 to-white">
      <h2 className="text-4xl font-extrabold text-center text-gray-800">
        What Our Users Say
      </h2>
      <p className="text-center text-gray-600">
        Discover how QueryHive has helped our community achieve their goals.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            className="p-6 bg-white rounded-xl shadow-xl border border-gray-200 transform hover:shadow-2xl hover:scale-105 transition-all duration-300"
            // whileHover={{ rotate: [0, 3, -3, 0], transition: { duration: 0.6 } }}
          >
            <div className="flex flex-col items-center space-y-4">
              <motion.img
                src={testimonial.photo}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full border-4 border-indigo-200 shadow-md"
                animate={{
                  scale: [1, 1.1, 1],
                //   rotate: [0, 5, -5, 0],
                  transition: { duration: 2, repeat: Infinity },
                }}
              />
              <h3
                className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient"
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
