import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const MyQueries = () => {
    const { user } = useContext(AuthContext);
    const [queries, setQueries] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        // axios.get(`https://ask-and-recommend-server.vercel.app/queries/email/${user?.email}`, {withCredentials: true})
        //     .then((response) => {
        //         setQueries(response.data);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
        axiosSecure.get(`/queries/email/${user?.email}`)
            .then(res => {
                setQueries(res.data);
            })
            .catch(error => {
                console.error(error);
            })
    }, [user?.email]);

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
                axios.delete(`https://ask-and-recommend-server.vercel.app/queries/${id}`)
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

    return (
        <div className="p-4 md:p-6">

            <Helmet>
                <title>My Queries | Query Hive</title>
            </Helmet>

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
            <div className="overflow-x-auto container mx-auto mt-10 -mb-10">
                <table className="table">
                    {/* head */}
                    <thead className="bg-gradient-to-r from-indigo-300 to-teal-300">
                        <tr className="text-base text-black">
                            <th>Sl No</th>
                            <th>Name</th>
                            <th>CreateAt</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((query, idx) => (
                            <tr key={query._id}>
                                <th>
                                    {idx + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={query.productImageURL || "https://via.placeholder.com/300"}
                                                    alt={query.productName} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{query.productName}</div>
                                            {/* <div className="text-sm opacity-50">United States</div> */}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {new Date(query.createdAt).toLocaleString()}
                                </td>
                                <td className="space-x-2 text-center">
                                    <Link to={`/details/${query._id}`} className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 text-center whitespace-nowrap">
                                        View Details
                                    </Link>
                                    <Link to={`/update-query/${query._id}`} className="flex-1 bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-300 text-center ">
                                        Update
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(query._id)}
                                        className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            // <div key={query._id} className="bg-gradient-to-br from-teal-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 hover:from-indigo-100 border">
                            //     <img
                            //         src={query.productImageURL || "https://via.placeholder.com/300"}
                            //         alt={query.productName}
                            //         className="w-full h-40 xl:h-52 object-fill rounded-t-lg mb-4"
                            //     />
                            //     <h2 className="text-2xl font-bold mb-2 text-gray-800">{query.queryTitle}</h2>
                            //     <p className="text-gray-700 mb-4"><span className="font-semibold">Product:</span> {query.productName}</p>
                            //     <p className="text-gray-600 text-sm mb-4">CreateAt: {new Date(query.createdAt).toLocaleString()}</p>
                            //     <div className="flex gap-3 flex-wrap">
                            //         <Link to={`/details/${query._id}`} className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 text-center whitespace-nowrap">
                            //             View Details
                            //         </Link>
                            //         <Link to={`/update-query/${query._id}`} className="flex-1 bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 text-center ">
                            //             Update
                            //         </Link>
                            //         <button
                            //             onClick={() => handleDelete(query._id)}
                            //             className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                            //         >
                            //             Delete
                            //         </button>
                            //     </div>
                            // </div>
                        ))}
                    </tbody>
                </table >
            </div >
            <div className="mt-10 mb-5 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container mx-auto">

                {/* {queries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((query) => (
                    <div key={query._id} className="bg-gradient-to-br from-teal-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 hover:from-indigo-100 border">
                        <img
                            src={query.productImageURL || "https://via.placeholder.com/300"}
                            alt={query.productName}
                            className="w-full h-40 xl:h-52 object-fill rounded-t-lg mb-4"
                        />
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">{query.queryTitle}</h2>
                        <p className="text-gray-700 mb-4"><span className="font-semibold">Product:</span> {query.productName}</p>
                        <p className="text-gray-600 text-sm mb-4">CreateAt: {new Date(query.createdAt).toLocaleString()}</p>
                        <div className="flex gap-3 flex-wrap">
                            <Link to={`/details/${query._id}`} className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 text-center whitespace-nowrap">
                                View Details
                            </Link>
                            <Link to={`/update-query/${query._id}`} className="flex-1 bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 text-center ">
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
                ))} */}
            </div>
        </div >
    );
};

export default MyQueries;
