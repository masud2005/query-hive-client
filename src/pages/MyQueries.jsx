import React from "react";
import { Link } from "react-router-dom";

const MyQueries = ({ queries, handleDelete }) => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Banner Section */}
            <div className="bg-green-500 text-white py-6 px-4 w-full text-center rounded-lg shadow-md">
                <h1 className="text-3xl font-bold">My Queries</h1>
                {/* <Link to="/add-query" className=" bg-white text-green-500 py-2 px-6 rounded-lg font-medium hover:bg-gray-200">Add New Query</Link> */}
                <Link to="/add-query" className="btn mt-10 text-base">Add Query</Link>
            </div>

            {/* Queries Section */}
            {/* <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {queries.length > 0 ? (
                    queries.map((query) => (
                        <div
                            key={query.id}
                            className="bg-white p-4 shadow-md rounded-lg flex flex-col"
                        >
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {query.productName}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">{query.queryTitle}</p>
                            <p className="text-sm text-gray-500">{query.boycottingReason}</p>
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={() => console.log(`View ${query.id}`)}
                                    className="text-blue-500 hover:underline"
                                >
                                    View Details
                                </button>
                                <button
                                    onClick={() => console.log(`Update ${query.id}`)}
                                    className="text-yellow-500 hover:underline"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(query.id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center">
                        <p className="text-gray-600 text-lg">No Queries Found</p>
                        <button
                            onClick={() => (window.location.href = "/add-query")}
                            className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
                        >
                            Add Query
                        </button>
                    </div>
                )}
            </div> */}
        </div>
    );
};

export default MyQueries;
