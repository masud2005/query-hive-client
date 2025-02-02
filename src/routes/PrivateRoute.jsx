import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import Loading from '../components/Loading';

const PrivateRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loading />
    }

    if (user) {
        return children
    }

    return <Navigate to={'/login'} state={location.pathname}></Navigate>
};

export default PrivateRoute;