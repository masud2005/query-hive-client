import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AddQuery = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddQuery = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const initialData = Object.fromEntries(form.entries());
        // console.log(initialData);
        const userEmail = user.email;
        const userName = user.displayName;
        const userPhotoURL = user.photoURL;
        const createdAt = new Date().toISOString();
        const recommendationCount = 0;

        const queryData = {
            ...initialData, userEmail, userName, userPhotoURL, createdAt, recommendationCount
        }
        // console.log(queryData);

        axios.post('https://ask-and-recommend-server.vercel.app/queries', queryData)
            .then(res => {
                // console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Query Added',
                        text: 'Your query has been added successfully!',
                        customClass: {
                            confirmButton: 'bg-teal-400 text-white'
                        }
                    });
                    navigate('/my-queries');
                }
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to Add Query',
                    text: error.code,
                    customClass: {
                        confirmButton: 'bg-red-400 text-white'
                    }
                });
            });

    };

    return (
        <div className="flex flex-col items-center px-2 my-10">

            <Helmet>
                <title>Add Query | Query Hive</title>
            </Helmet>
                
            <h1 className="text-3xl font-bold"><span className="text-indigo-600">Add a</span> <span className="text-teal-600">New Query</span></h1>

            {/* Form Section */}
            <form
                onSubmit={handleAddQuery}
                className="bg-gradient-to-br from-teal-50 p-6 mt-6 w-full container max-w-5xl shadow-lg rounded-lg border"
            >
                <div className="mb-5 ">
                    <label className="block text-gray-700 font-medium mb-2 text-base md:text-lg">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="productName"
                        placeholder="Enter product name"
                        className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                        required
                    />
                </div>
                <div className="mb-5  ">
                    <label className="block text-gray-700 font-medium mb-2 text-base md:text-lg">
                        Product Brand
                    </label>
                    <input
                        type="text"
                        name="productBrand"
                        placeholder="Enter product brand"
                        className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                        required
                    />
                </div>
                <div className="mb-5  ">
                    <label className="block text-gray-700 font-medium mb-2 text-base md:text-lg">
                        Product Image URL
                    </label>
                    <input
                        type="url"
                        name="productImageURL"
                        placeholder="Enter product image URL"
                        className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                    />
                </div>
                <div className="mb-5  ">
                    <label className="block text-gray-700 font-medium mb-2 text-base md:text-lg">
                        Query Title
                    </label>
                    <input
                        type="text"
                        name="queryTitle"
                        placeholder="Enter your query title"
                        className="input input-bordered w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                        required
                    />
                </div>
                <div className="mb-5  ">
                    <label className="block text-gray-700 font-medium mb-2 text-base md:text-lg">
                        Boycotting Reason Details
                    </label>
                    <textarea
                        name="boycottingReason"
                        placeholder="Explain why you want to boycott this product"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-300 transition"
                        rows="4"
                        required
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-teal-400 w-full font-medium text-lg py-3 px-6 rounded-lg hover:bg-teal-500"
                    >
                        Add Query
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddQuery;
