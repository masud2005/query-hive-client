import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const RecommendationsForMe = () => {
    const { user } = useContext(AuthContext);
    const [recommendations, setRecommendations] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        // Fetch recommendations for the user's queries
        // axios.get(`https://ask-and-recommend-server.vercel.app/recommendations/user/${user?.email}`, { withCredentials: true })
        //     .then(res => {
        //         setRecommendations(res.data);
        //     })
        //     .catch(err => {
        //         console.error("Failed to fetch recommendations:", err);
        //     });

        axiosSecure.get(`/recommendations/user/${user?.email}`) 
            .then(res => {
                setRecommendations(res.data);
            })
            .catch(err => {
                console.error("Failed to fetch recommendations:", err);
            });

    }, [user?.email]);

    return (
        <div className="container mx-auto my-10 p-2 md:p-5">

            <Helmet>
                <title>Recommendations For Me | Query Hive</title>
            </Helmet>

            {/* Page Heading */}
            <h1 className="text-3xl font-extrabold text-center text-teal-500 mb-12 -mt-7">
            Recommendations<span className="text-indigo-500"> For Me</span>
            </h1>

            {/* My Recommendations Table */}
            {
                recommendations.length === 0 ?
                    <>
                        <p className="text-2xl -mt-5 text-center text-red-500">No Recommendations Found For Me.</p>
                    </>
                    :
                    <>
                        <div className="overflow-x-auto ">
                            <table className="table table-zebra">
                                {/* Table Head */}
                                <thead className="bg-gradient-to-r from-indigo-300 to-teal-300">
                                    <tr className="text-base text-black">
                                        <th>Sl No</th>
                                        <th>Recommend Image</th>
                                        <th>Recommend Name</th>
                                        <th>Recommend Reason</th>
                                        <th>Recommender</th>
                                        <th>Recommend Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recommendations.map((recommend, index) => (
                                        <tr className="text-base" key={recommend._id}>
                                            <th>{index + 1}</th>
                                            <td><img className="w-14 h-14 rounded-lg" src={recommend.recommendedProductImage} alt="Recommended Image..." /></td>
                                            <td>{recommend.productName}</td>
                                            <td>{recommend.recommendationReason}</td>
                                            <td>{recommend.recommenderName} <span className="text-sm">({recommend.recommenderEmail})</span></td>
                                            <td>{new Date(recommend.currentTime).toLocaleString()}</td>
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

export default RecommendationsForMe;
