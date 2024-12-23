import axios from 'axios';
import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateQuery = () => {

    const navigate = useNavigate();
    const loaderData = useLoaderData();
    // console.log(loaderData);
    const { productName, productBrand, productImageURL, queryTitle, boycottingReason } = loaderData;
    
    const handleUpdateQuery = (e) => {
        e.preventDefault();
        // const form = new FormData(e.target);
        // const initialData = Object.fromEntries(form.entries());
        const form = new FormData(e.target);
        const initialData = Object.fromEntries(form.entries());
        const updatedDateTime = new Date().toISOString();
        const updateQuery = {...initialData, updateTime: updatedDateTime};

        axios.patch(`http://localhost:5000/queries/${loaderData._id}`, updateQuery)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Query Updated',
                        text: 'Your query has been updated successfully!',
                        customClass: {
                            confirmButton: 'bg-teal-400 text-white'
                        }
                    })
                    navigate('/my-queries');
                }
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to Update Query',
                    text: error.code,
                    customClass: {
                        confirmButton: 'bg-red-400 text-white'
                    }
                });
            });
    };


    return (
        <div className="flex flex-col items-center px-2 my-10">

            <h1 className="text-3xl font-bold"><span className="text-teal-600">Update</span> <span className="text-indigo-600"> Query</span></h1>

            {/* Form Section */}
            <form
                onSubmit={handleUpdateQuery}
                className="bg-gradient-to-br from-teal-50 p-6 mt-6 w-full container max-w-5xl shadow-lg rounded-lg border"
            >
                <div className="mb-5 ">
                    <label className="block text-gray-700 font-medium mb-2 text-base md:text-lg">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="productName"
                        defaultValue={productName}
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
                        defaultValue={productBrand}
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
                        type="text"
                        name="productImageURL"
                        defaultValue={productImageURL}
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
                        defaultValue={queryTitle}
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
                        defaultValue={boycottingReason}
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
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateQuery;