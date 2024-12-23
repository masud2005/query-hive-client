import React from 'react';
import { useLoaderData } from 'react-router-dom';

const QueryDetails = () => {
    const loaderData = useLoaderData();
    console.log(loaderData);
    
    return (
        <div>
            QueryDetails
        </div>
    );
};

export default QueryDetails;