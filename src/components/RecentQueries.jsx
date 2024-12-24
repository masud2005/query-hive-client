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
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6">Recently Queries</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {queries.map(query => (
                    <div key={query._id} className="rounded overflow-hidden shadow-lg bg-white">
                        <img className="w-full h-48 object-cover" src={query.productImageURL} alt={query.productName} />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800">{query.queryTitle}</h3>
                            <p className="text-gray-500 mt-2">Brand: {query.productBrand}</p>
                            <p className="text-gray-500 mt-2">{query.boycottingReason}</p>
                            <p className="text-gray-500 mt-2">Recommendations: {query.recommendationCount}</p>
                            <p className="text-sm text-gray-400 mt-4">Posted by {query.userName}</p>
                            <p className="text-sm text-gray-400">{new Date(query.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentQueries;
