import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecentQueries = () => {
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        // API call to get recent queries
        axios.get('http://localhost:5000/recent-queries')
            .then(response => {
                setQueries(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the queries!", error);
            });
    }, []);

    return (
        <div className="container mx-auto px-4 xl:px-0 mt-10">
            {/* Section Header */}
            <div className="text-center mb-12 px-5">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
                    <span className="text-indigo-500">Recently</span> <span className="text-teal-500">Added Queries</span>
                </h2>
                <p className="text-lg text-gray-600">
                    Explore the recent product-related queries, including detailed descriptions, reasons, and recommendations.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {queries.map(query => (
                    <div
                        key={query._id}
                        className="rounded-lg overflow-hidden shadow-lg bg-white group flex flex-col h-full"
                    >
                        {/* Card Image */}
                        <div className="relative overflow-hidden">
                            <img
                                className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                                src={query.productImageURL}
                                alt={query.productName}
                            />
                        </div>
                        {/* Card Content */}
                        <div className="p-6 flex-1 flex flex-col border-t border-gray-200">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{query.queryTitle}</h3>
                            <p className="text-gray-500 mb-2">{query.description}</p>
                            <p className="text-gray-500">Brand: {query.productBrand}</p>
                            <p className="text-gray-500 mt-1">{query.boycottingReason}</p>
                            <p className="text-gray-500 mt-1">Recommendations: {query.recommendationCount}</p>
                        </div>
                        {/* User Info */}
                        <div className="p-4 bg-gray-100 mt-auto border-t border-gray-300 text-center">
                            <p className="text-sm text-gray-600">Posted by {query.userName}</p>
                            <p className="text-sm text-gray-500">{new Date(query.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentQueries;
