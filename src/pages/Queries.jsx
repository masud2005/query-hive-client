import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Queries = () => {
    const allQueries = useLoaderData();
    const [queries, setQueries] = useState(allQueries);

    return (
        <div className="p-4 md:p-6">
            <h1 className="text-3xl font-bold text-center"><span className="text-indigo-600">Add a</span> <span className="text-teal-600">New Query</span></h1>

            {/* Queries Section */}
            <div className="mt-10 mb-5 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container mx-auto">
                {queries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((query) => (
                    <div key={query._id} className="bg-gradient-to-br from-teal-50 p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 border">
                        <img
                            src={query.productImageURL || "https://via.placeholder.com/300"}
                            alt={query.productName}
                            className="w-full h-40 xl:h-52 object-fill rounded-t-lg mb-4"
                        />
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">{query.queryTitle}</h2>
                        <p className="text-gray-700 mb-2"><span className="font-semibold">Product:</span> {query.productName}</p>
                        <p className="text-gray-600 text-sm mb-2">CreateAt: {new Date(query.createdAt).toLocaleString()}</p>
                        {/* Recommendation Count */}
                        <p className="text-gray-800 font-medium mb-2">
                            <span className="font-semibold">Recommendations:</span>{" "}
                            {query.recommendationCount || 0}
                        </p>
                        {/* Recommend Button */}
                        <div className='flex justify-center border-t pt-3 mt-5'>
                            <Link to={`/details/${query._id}`}
                                className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition"
                            >
                                Recommend
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Queries;