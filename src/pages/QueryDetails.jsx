import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { use } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const QueryDetails = () => {
    const { user } = useContext(AuthContext);
    const loaderData = useLoaderData();
    const [query, setQuery] = useState(loaderData);
    const [recommendations, setRecommendations] = useState([]);
    // console.log(query);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/queries/${query._id}/recommendations`)
            .then(res => {
                setRecommendations(res.data);
            })
            .catch(error => {
                // console.error(error);
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

    // useEffect(() => {
    //     axios.get(`https://ask-and-recommend-server.vercel.app/queries/${query._id}/recommendations`)
    //         .then(res => {
    //             setRecommendations(res.data);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Failed to Fetch Recommendations',
    //                 text: error.code,
    //                 customClass: {
    //                     confirmButton: 'bg-red-400 text-white'
    //                 }
    //             });
    //         });
    // }, []);

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

        axios.post('https://ask-and-recommend-server.vercel.app/recommendations', recommendationQuery)
            .then(res => {
                // console.log(res.data);
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
                    e.target.reset();
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

            <Helmet>
                <title>Query Details | Query Hive</title>
            </Helmet>

            {/* Main Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch px-2">
                {/* User Information Section */}
                <div className="bg-white shadow-lg rounded-xl p-6 space-y-8">
                    {/* User Information Section */}
                    <div className="flex flex-col items-center text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">User Information</h2>
                        {/* Profile Picture */}
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-teal-500 shadow-md">
                            <img
                                src={query.userPhotoURL || "https://via.placeholder.com/150"}
                                alt="User Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* User Name */}
                        <h3 className="mt-4 text-xl md:text-2xl font-bold text-gray-800">{query.userName}</h3>

                        {/* User Email */}
                        <p className="mt-2 text-gray-600 text-sm md:text-base">
                            <span className="font-semibold text-teal-500">Email:</span> {query.userEmail}
                        </p>
                    </div>

                    {/* Product Information Section */}
                    <div className="border-t pt-6 flex flex-col lg:flex-col gap-6 items-center">
                        {/* Product Image */}
                        <div className="flex-shrink-0 w-full  h-40 md:h-52 rounded-lg overflow-hidden shadow-md">
                            <img
                                src={query.productImageURL || "https://via.placeholder.com/300"}
                                alt="Product"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300">
                                <tbody>
                                    <tr className="border-b">
                                        <td className="px-2 md:px-4 lg:px-2 xl:px-4 py-2 font-semibold text-gray-700 border-r">Product Title:</td>
                                        <td className="px-2 md:px-4 lg:px-2 xl:px-4 py-2">{query.queryTitle}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="px-2 md:px-4 lg:px-2 xl:px-4 py-2 font-semibold text-gray-700 border-r">Product Name:</td>
                                        <td className="px-2 md:px-4 lg:px-2 xl:px-4 py-2">{query.productName || "Not Provided"}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="px-2 md:px-4 lg:px-2 xl:px-4 py-2 font-semibold text-gray-700 border-r">Product Brand:</td>
                                        <td className="px-2 md:px-4 lg:px-2 xl:px-4 py-2">{query.productBrand}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="px-2 md:px-4 lg:px-2 xl:px-4 py-2 font-semibold text-gray-700 border-r">Boycotting Reason:</td>
                                        <td className="px-2 md:px-4 lg:px-2 xl:px-4 py-2">{query.boycottingReason}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="px-2 md:px-4 lg:px-2 xl:px-4 py-2 font-semibold text-gray-700 border-r">Created Date:</td>
                                        <td className="px-2 md:px-4 lg:px-2 xl:px-4 py-2">{new Date(query.createdAt).toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 md:px-4 lg:px-2 xl:px-4 py-2 font-semibold text-gray-700 border-r">Recommendations Count:</td>
                                        <td className="px-2 md:px-4 lg:px-2 xl:px-4 py-2">{query.recommendationCount}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

                {/* Recommendation Form */}
                <div className=" bg-gray-50 shadow-lg rounded-lg p-6 flex flex-col">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Add a Recommendation</h3>
                    <form onSubmit={handleRecommendation} className="flex flex-col space-y-4">
                        <div>
                            <label
                                className="font-medium text-gray-700"
                            >
                                Recommendation Title
                            </label>
                            <input
                                type="text"
                                name="recommendationTitle"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                                placeholder="Enter title"
                                required
                            />
                        </div>
                        <div>
                            <label
                                className="font-medium text-gray-700"
                            >
                                Recommended Product Name
                            </label>
                            <input
                                type="text"
                                name="recommendedProductName"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                                placeholder="Enter product name"
                                required
                            />
                        </div>
                        <div>
                            <label
                                className="font-medium text-gray-700"
                            >
                                Recommended Product Image (URL)
                            </label>
                            <input
                                type="url"
                                name="recommendedProductImage"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                                placeholder="Enter image URL"
                                required
                            />
                        </div>
                        <div>
                            <label
                                className="font-medium text-gray-700"
                            >
                                Recommendation Reason
                            </label>
                            <textarea
                                name="recommendationReason"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                                placeholder="Enter reason"
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition"
                        >
                            Add Recommendation
                        </button>
                    </form>
                </div>
            </div>

            <div className="pt-6">
                {/* Recommendations List Section */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">All Recommendations</h3>
                    <div className="space-y-6">
                        {
                            recommendations.length === 0 &&
                            <p className="text-lg text-center text-red-500">No recommendations found for this query.</p>
                        }
                        {recommendations.map((recommendation, index) => (
                            <div
                                key={recommendation._id}
                                className="bg-gray-50 p-4 rounded-lg shadow-md border hover:shadow-lg transition-shadow flex gap-4 items-center"
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
