import React from 'react';

const QueryCategories = () => {
    const categories = [
        {
            name: "Technical Support",
            image: "https://i.ibb.co/7STvn5Y/technical-support.jpg",
        },
        {
            name: "Billing Queries",
            image: "https://i.ibb.co/yFX5vhk/billing-queries.jpg",
        },
        {
            name: "Product Information",
            image: "https://i.ibb.co/Cnct09C/product-information.jpg",
        },
        {
            name: "Account Management",
            image: "https://i.ibb.co/d6GvKgS/account-management.jpg",
        },
        {
            name: "Feedback & Suggestions",
            image: "https://i.ibb.co/jLYkJ9q/feedback-suggestions.jpg",
        },
        {
            name: "General Inquiries",
            image: "https://i.ibb.co/TkMSBMZ/general-inquiries.jpg",
        },
    ];

    return (
        <div className="container mx-auto px-4 my-10">
            {/* Section Header */}
            <div className="text-center mb-12 px-5">
                <h2 className="text-4xl font-extrabold text-teal-500 mb-4">
                    Explore Our <span className="text-indigo-500">Query Categories</span>
                </h2>
                <p className="text-lg text-gray-600">
                    Browse through our categories to find the answers or support you need.
                </p>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                        <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                            {category.name}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QueryCategories;
