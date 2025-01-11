import React from 'react';

const QueryCategories = () => {
    const categories = [
        {
            name: "Technical Support",
            image: "https://i.ibb.co.com/khgjkKF/download-3.jpg",
        },
        {
            name: "Billing Queries",
            image: "https://i.ibb.co.com/zxVwCDN/pngtree-3d-currency-imag-png-image-13497503.png",
        },
        {
            name: "Product Information",
            image: "https://i.ibb.co.com/tMLbKN6/pim-product-information-system-concept-260nw-2366280683.webp",
        },
        {
            name: "Account Management",
            image: "https://i.ibb.co.com/vDKyd10/audit-business-concept-compliance-internal-600nw-2488413191.webp",
        },
        {
            name: "Feedback & Suggestions",
            image: "https://i.ibb.co.com/DgjrDbC/stock-vector-suggestion-vector-concept-business-people-putting-light-bulb-into-a-suggestion-box-2014.jpg",
        },
        {
            name: "General Inquiries",
            image: "https://i.ibb.co.com/Xsy6t0F/premium-photo-1678048604398-f42dda6997bd.jpg",
        },
    ];

    return (
        <div className="container mx-auto px-4 my-10">
            {/* Section Header */}
            <div className="text-center mb-12 px-5">
                <h2 className="text-4xl font-extrabold text-teal-500 mb-4">
                    Explore Our <span className="text-indigo-500">Query Categories</span>
                </h2>
                <p className="text-lg ">
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
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300 brightness-75"
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
