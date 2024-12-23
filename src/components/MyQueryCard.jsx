import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyQueryCard = ({ query }) => {

    const handleDelete = (id) => {
        console.log('Delete query with id:', id);
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
                    console.log(res.data);
                    if(res.data.deletedCount === 1) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "The query has been successfully deleted.",
                            icon: "success",
                            confirmButtonColor: "#14B8A6"
                        });
                    }
                })
                .catch(error => {
                    console.error(error);
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
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">{query.queryTitle}</h2>
            <h2 className="text-xl font-bold mb-2">{query.createdAt}</h2>
            <p className="text-gray-700 mb-4">{query.productName} - {query.productBrand}</p>
            <div className="flex gap-2">
                <Link to={`/query/${query._id}`}
                    className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                >
                    View Details
                </Link>
                <Link to={`/update-query/${query._id}`}
                    className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600"
                >
                    Update
                </Link>
                <button
                    onClick={() => handleDelete(query._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default MyQueryCard;