import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";

const RecommendationsForMe = () => {
    const { user } = useContext(AuthContext);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        // Fetch recommendations for the user's queries
        axios.get(`http://localhost:5000/recommendations/user/${user?.email}`)
            .then(res => {
                setRecommendations(res.data);
            })
            .catch(err => {
                console.error("Failed to fetch recommendations:", err);
            });
    }, [user?.email]);

    return (
        // <div>
        //     <h1>Recommendations For Me</h1>
        //     <table border="1" style={{ width: "100%", textAlign: "left" }}>
        //         <thead>
        //             <tr>
        //                 <th>Recommendation</th>
        //                 <th>Recommender Name</th>
        //                 <th>Query Title</th>
        //                 <th>Created At</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {recommendations.map(recommend => (
        //                 <tr key={recommend._id}>
        //                     <td>{recommend.recommendedProductName}</td>
        //                     <td>{recommend.recommenderName} {recommend.recommenderEmail}</td>
        //                     <td>{recommend.queryTitle}</td>
        //                     <td>{new Date(recommend.currentTime).toLocaleString()}</td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
        // </div>
        <div className="container mx-auto my-10 p-2 md:p-5">
            {/* Page Heading */}
            <h1 className="text-3xl font-extrabold text-center text-teal-500 mb-12 -mt-7">
            Recommendations<span className="text-indigo-500"> For Me</span>
            </h1>

            {/* My Recommendations Table */}
            {
                recommendations.length === 0 ?
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
