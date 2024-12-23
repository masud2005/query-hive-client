import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const QueryDetails = () => {
    const { user } = useContext(AuthContext);
    const loaderData = useLoaderData();
    const [query, setQuery] = useState(loaderData);
    const [recommendations, setRecommendations] = useState([]);
    console.log(recommendations);

    useEffect(() => {
        axios.get(`http://localhost:5000/queries/${query._id}/recommendations`)
            .then(res => {
                setRecommendations(res.data);
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to Fetch Recommendations',
                    text: error.code,
                    customClass: {
                        confirmButton: 'bg-red-400 text-white'
                    }
                });
            });
    }, []);

    const handleRecommendation = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const initialData = Object.fromEntries(form.entries());
        const queryId = query._id;
        const queryTitle = query.queryTitle;
        const productName = query.productName;
        const userEmail = query.userEmail;
        const userName = query.userName;
        const recommenderEmail = user.email;
        const recommenderName = user.displayName;
        const currentTime = new Date().toISOString();
        const recommendationQuery = { ...initialData, queryId, queryTitle, productName, userEmail, userName, recommenderEmail, recommenderName, currentTime };
        // console.log(recommendationQuery);

        axios.post('http://localhost:5000/recommendations', recommendationQuery)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    // alert('Recommendation added successfully!');
                    setQuery(prevQuery => ({
                        ...prevQuery,
                        recommendationCount: prevQuery.recommendationCount + 1,
                    }));

                    setRecommendations(prevRecommendations => [
                        ...prevRecommendations,
                        { ...recommendationQuery, _id: res.data.insertedId },
                    ]);

                    Swal.fire({
                        icon: 'success',
                        title: 'Recommendation Added',
                        text: 'Your recommendation has been added successfully!',
                        customClass: {
                            confirmButton: 'bg-teal-400 text-white'
                        }
                    })
                }
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to Add Recommendation',
                    text: error.code,
                    customClass: {
                        confirmButton: 'bg-red-400 text-white'
                    }
                });
            });
    }

    return (
        <div className="container mx-auto py-6 my-10">
            {/* Main Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* User Information Section */}
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">User Information</h2>
                    <div className="grid grid-cols-3 gap-4 items-start">
                        <div className="col-span-1 flex justify-center">
                            <img
                                src={query.productImageURL}
                                alt="Product"
                                className="w-40 h-40 rounded-lg object-cover shadow-md"
                            />
                        </div>
                        <div className="col-span-2 space-y-4">
                            <p className="text-gray-700">
                                <strong>Query Title:</strong> {query.queryTitle}
                            </p>
                            <p className="text-gray-700">
                                <strong>Product Name:</strong> {query.productName}
                            </p>
                            <p className="text-gray-700">
                                <strong>Product Brand:</strong> {query.productBrand}
                            </p>
                            <p className="text-gray-700">
                                <strong>Created By:</strong> {query.userName} (<span className="text-blue-500">{query.userEmail}</span>)
                            </p>
                            <p className="text-gray-700">
                                <strong>Reason:</strong> {query.boycottingReason}
                            </p>
                            <p className="text-gray-700">
                                <strong>Recommendations Count:</strong> {query.recommendationCount}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Recommendation Form */}
                <div className="bg-gray-50 shadow-lg rounded-lg p-6 flex flex-col">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add a Recommendation</h3>
                    <form onSubmit={handleRecommendation} className="flex flex-col space-y-4">
                        <div>
                            <label
                                htmlFor="recommendationTitle"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Recommendation Title
                            </label>
                            <input
                                type="text"
                                name="recommendationTitle"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter title"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="recommendedProductName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Recommended Product Name
                            </label>
                            <input
                                type="text"
                                name="recommendedProductName"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter product name"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="recommendedProductImage"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Recommended Product Image (URL)
                            </label>
                            <input
                                type="url"
                                name="recommendedProductImage"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter image URL"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="recommendationReason"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Recommendation Reason
                            </label>
                            <textarea
                                name="recommendationReason"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter reason"
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
                        >
                            Add Recommendation
                        </button>
                    </form>
                </div>
            </div>

            <div className="container mx-auto pt-6">
                {/* Recommendations List Section */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">All Recommendations</h3>
                    <div className="space-y-6">
                        {recommendations.map((recommendation, index) => (
                            <div
                                key={recommendation._id}
                                className="bg-gray-50 p-4 rounded-lg shadow-md border hover:shadow-lg transition-shadow flex gap-4 items-start"
                            >
                                {/* Recommended Product Image */}
                                <img
                                    src={recommendation.recommendedProductImage}
                                    alt="Recommended Product"
                                    className="w-24 h-24 rounded-md object-cover shadow-sm border"
                                />

                                {/* Recommendation Content */}
                                <div className="flex-1">
                                    <p className="text-gray-800 font-medium text-lg">
                                        <strong>Title:</strong> {recommendation.recommendationTitle}
                                    </p>
                                    <p className="text-gray-800">
                                        <strong>Recommended Product:</strong> {recommendation.recommendedProductName}
                                    </p>
                                    <p className="text-gray-700 mt-2">
                                        <strong>Reason:</strong> {recommendation.recommendationReason}
                                    </p>
                                    {/* <p className="text-gray-500 text-sm mt-2">
                                        Recommended by <strong>{recommendation.recommenderName}</strong> on{' '}
                                        {new Date(recommendation.createdAt).toLocaleDateString()}
                                    </p> */}
                                    <p className="text-gray-500 text-sm mt-2">
                                        Recommended by <strong>{recommendation.recommenderName}</strong> on{' '}
                                        {new Date(recommendation.currentTime).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default QueryDetails;
