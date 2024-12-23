import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

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

        axios.post('http://localhost:5000/queries', queryData)
            .then(res => {
                console.log(res.data);
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
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            {/* Banner Section */}
            <div className="bg-blue-500 text-white py-6 px-4 w-full text-center rounded-lg shadow-md">
                <h1 className="text-3xl font-bold">Add a New Query</h1>
            </div>

            {/* Form Section */}
            <form
                onSubmit={handleAddQuery}
                className="bg-white p-6 mt-6 w-full max-w-lg shadow-lg rounded-lg"
            >
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="productName"
                        placeholder="Enter product name"
                        className="w-full p-3 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Product Brand
                    </label>
                    <input
                        type="text"
                        name="productBrand"
                        placeholder="Enter product brand"
                        className="w-full p-3 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Product Image URL
                    </label>
                    <input
                        type="text"
                        name="productImageURL"
                        placeholder="Enter product image URL"
                        className="w-full p-3 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Query Title
                    </label>
                    <input
                        type="text"
                        name="queryTitle"
                        placeholder="Enter your query title"
                        className="w-full p-3 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Boycotting Reason Details
                    </label>
                    <textarea
                        name="boycottingReason"
                        placeholder="Explain why you want to boycott this product"
                        className="w-full p-3 border rounded-lg"
                        rows="4"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
                >
                    Add Query
                </button>
            </form>
        </div>
    );
};

export default AddQuery;
