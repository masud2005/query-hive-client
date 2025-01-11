import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLoaderData } from 'react-router-dom';

const Queries = () => {
    const allQueries = useLoaderData();
    const [queries, setQueries] = useState(allQueries);
    const [searchText, setSearchText] = useState("");
    const [gridColumns, setGridColumns] = useState(3);
    const [sortByRecommendation, setSortByRecommendation] = useState(false);

    // Filter Queries based on search text
    const filteredQueries = queries.filter(query =>
        query.productName.toLowerCase().includes(searchText.toLowerCase())
    );

    // Sort Queries by recommendationCount
    const sortedQueries = sortByRecommendation
        ? [...filteredQueries].sort((a, b) => (b.recommendationCount || 0) - (a.recommendationCount || 0))
        : filteredQueries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className="p-2 md:p-6">

            <Helmet>
                <title>All Queries | Query Hive</title>
            </Helmet>

            <h1 className="text-3xl font-bold text-center"><span className="text-indigo-600">All</span> <span className="text-teal-600">Queries</span></h1>

            {/* Search Field */}
            <div className="my-4 flex justify-center items-center">
                <input
                    type="text"
                    placeholder="Search by product name"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full max-w-md p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
            </div>

            {/* Layout Toggle Buttons */}
            <div className="my-4 flex justify-center gap-4">
                <button
                    onClick={() => setGridColumns(1)}
                    className={`py-2 px-4 rounded-lg border lg:hidden ${gridColumns === 1 ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-700"}`}
                >
                    1 Column
                </button>
                <button
                    onClick={() => setGridColumns(2)}
                    className={`py-2 px-4 rounded-lg border ${gridColumns === 2 ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-700"}`}
                >
                    2 Columns
                </button>
                <button
                    onClick={() => setGridColumns(3)}
                    className={`py-2 px-4 rounded-lg border hidden lg:block ${gridColumns === 3 ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-700"}`}
                >
                    3 Columns
                </button>
            </div>

            {/* Sort Button */}
            <div className="my-4 flex justify-end container mx-auto">
                <button
                    onClick={() => setSortByRecommendation(!sortByRecommendation)}
                    className={`py-2 px-4 rounded-lg border ${sortByRecommendation ? "bg-teal-500 text-white" : "bg-teal-500 text-white"}`}
                >
                    {sortByRecommendation ? "Sort by Date" : "Sort by Recommendations"}
                </button>
            </div>

            {/* Queries Not Found Message */}
            {
                sortedQueries.length === 0 && (
                    <p className="text-center text-red-500 text-2xl mt-10">
                        No queries found for "<span className="font-semibold text-indigo-600">{searchText}</span>". Please try a different search term.
                    </p>
                )
            }

            {/* Queries Section */}
            <div className={`mt-10 mb-5 grid gap-2 md:gap-6 grid-cols-1 ${gridColumns === 2 ? "grid-cols-2" : ""} ${gridColumns === 3 ? "lg:grid-cols-3" : ""} container mx-auto`}>
                {sortedQueries.map((query) => (
                    <div key={query._id} className="bg-gradient-to-br from-teal-50 p-2 md:p-6 rounded-lg shadow-lg hover:shadow-xl hover:from-indigo-100 border">
                        <img
                            src={query.productImageURL || "https://via.placeholder.com/300"}
                            alt={query.productName}
                            className="w-full h-40 xl:h-52 object-fill rounded-t-lg mb-4"
                        />
                        <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-800">{query.queryTitle}</h2>
                        <p className="text-gray-700 mb-2 text-sm md:text-base"><span className="font-semibold text-sm md:text-base">Product Name:</span> {query.productName}</p>
                        <p className="text-gray-600 text-sm md:text-base mb-2">Created At: {new Date(query.createdAt).toLocaleString()}</p>
                        {/* Recommendation Count */}
                        <p className="text-gray-800 font-medium mb-2">
                            <span className="font-semibold">Recommendations:</span>{" "}
                            {query.recommendationCount || 0}
                        </p>
                        {/* Recommend Button */}
                        <div className='flex justify-center border-t pt-3 mt-5'>
                            <Link to={`/details/${query._id}`}
                                className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition"
                            >Recommend</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Queries;
