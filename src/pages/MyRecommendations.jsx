import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyRecommendations = () => {
    const { user } = useContext(AuthContext);
    const [myRecommendations, setMyRecommendations] = useState([]);
    console.log(myRecommendations);

    useEffect(() => {
        // Fetch my recommendations
        axios.get(`http://localhost:5000/recommendations/email/${user?.email}`)
            .then(res => {
                setMyRecommendations(res.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    // if (myRecommendations.length === 0) {
    //     return (
    //         <div className="container mx-auto my-10 p-2 md:p-5">
    //             <h1 className="text-3xl font-extrabold text-center text-indigo-500 mb-12 -mt-7">
    //                 My <span className="text-teal-500">Recommendations</span>
    //             </h1>
    //             <div className="bg-gradient-to-r from-teal-300 to-indigo-300 text-white py-8 px-6 w-full text-center rounded-lg shadow-xl">
    //                 <h2 className="text-2xl font-bold">No Recommendations Found</h2>
    //             </div>
    //         </div>
    //     );
    // }

    const handleDeleteRecommend = (id) => {
        console.log('Delete Recommendation:', id);
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
                axios.delete(`http://localhost:5000/recommendations/${id}`)
                    .then(res => {
                        if (res.data.deletedCount === 1) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your recommendation has been successfully deleted.",
                                icon: "success",
                                confirmButtonColor: "#14B8A6"
                            });
                            const remainingRecommendations = myRecommendations.filter(recommend => recommend._id !== id);
                            setMyRecommendations(remainingRecommendations);
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
        <div className="container mx-auto my-10 p-2 md:p-5">
            {/* Page Heading */}
            <h1 className="text-3xl font-extrabold text-center text-indigo-500 mb-12 -mt-7">
                My <span className="text-teal-500">Recommendations</span>
            </h1>

            {/* Equipment Table */}
            {
                myRecommendations.length === 0 ?
                    <>
                        <p className="text-2xl -mt-5 text-center text-red-500">No Recommendations Found.</p>
                    </>
                    :
                    <>
                        <div className="overflow-x-auto ">
                            <table className="table table-zebra">
                                {/* Table Head */}
                                <thead className="bg-gradient-to-r from-indigo-300 to-teal-300">
                                    <tr className="text-base text-black">
                                        <th>Sl No</th>
                                        <th>Product Name</th>
                                        <th>Recommend Reason</th>
                                        <th>Recommend Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myRecommendations.map((recommend, index) => (
                                        <tr className="text-base" key={recommend._id}>
                                            <th>{index + 1}</th>
                                            <td>{recommend.productName}</td>
                                            <td>{recommend.recommendationReason}</td>
                                            <td>{new Date(recommend.currentTime).toLocaleString()}</td>
                                            <td>
                                                <button onClick={() => handleDeleteRecommend(recommend._id)} className="bg-red-400 hover:bg-red-500 transition-all duration-200 py-[6px] px-3 rounded-full cursor-pointer text-black whitespace-nowrap">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
            }

        </div>
    );
};

export default MyRecommendations;