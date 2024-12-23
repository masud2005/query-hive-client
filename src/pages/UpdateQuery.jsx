import React from 'react';
import { useLoaderData } from 'react-router-dom';

const UpdateQuery = () => {

    const loaderData = useLoaderData();
    console.log(loaderData);

    return (
        <div>
            Update Query
        </div>
    );
};

export default UpdateQuery;