import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyQueries = () => {
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/queries")
            .then((response) => {
                setQueries(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Once deleted, you won't be able to revert this action!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#14B8A6",
            cancelButtonColor: "#EF4444",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/queries/${id}`)
                    .then(res => {
                        if (res.data.deletedCount === 1) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "The query has been successfully deleted.",
                                icon: "success",
                                confirmButtonColor: "#14B8A6"
                            });
                            const remainingQueries = queries.filter(query => query._id !== id);
                            setQueries(remainingQueries);
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Failed to Delete",
                            text: error.code,
                            icon: "error",
                            confirmButtonColor: "#14B8A6"
                        });
                    });
            }
        });
    };

    // if (queries.length === 0) {
    //     return (
    //         <div className="text-center">
    //             <p className="text-gray-700 text-lg">No queries found. Add your first query!</p>
    //             <Link to={"/add-query"} className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-lg hover:bg-blue-600">
    //                 Add Query
    //             </Link>
    //         </div>
    //     );
    // }

    return (
        <div className=" p-6 ">
            {/* Banner Section */}
            <div className="bg-gradient-to-r from-teal-300 via-blue-400 to-indigo-300 text-white py-8 px-6 w-full text-center rounded-lg shadow-xl">
                {
                    queries.length === 0 ?
                        <h1 className="text-4xl  font-extrabold drop-shadow-lg">No queries found. Add your first query!</h1>
                        :
                        <h1 className="text-4xl font-extrabold drop-shadow-lg">My Queries</h1>
                }
                <Link
                    to="/add-query"
                    className="inline-block mt-6 bg-white text-indigo-600 font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-indigo-100 transition-all duration-300"
                >
                    Add Query
                </Link>
            </div>

            {/* Queries Section */}
            <div className="mt-6  grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container mx-auto">
                {queries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((query) => (
                    <div key={query._id} className="bg-gradient-to-br from-teal-50 p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105">
                        <img
                            src={query.productImageURL || "https://via.placeholder.com/300"}
                            alt={query.productName}
                            className="w-full h-40 xl:h-52 object-fill rounded-t-lg mb-4"
                        />
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">{query.queryTitle}</h2>
                        <p className="text-gray-600 text-sm mb-4">{new Date(query.createdAt).toLocaleString()}</p>
                        <p className="text-gray-700 mb-4"><span className="font-semibold">Product:</span> {query.productName} - {query.productBrand}</p>
                        <div className="flex gap-3 flex-wrap">
                            <Link to={`/query/${query._id}`} className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 text-center whitespace-nowrap">
                                View Details
                            </Link>
                            <Link to={`/update-query/${query._id}`} className="flex-1 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 text-center ">
                                Update
                            </Link>
                            <button
                                onClick={() => handleDelete(query._id)}
                                className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyQueries;
