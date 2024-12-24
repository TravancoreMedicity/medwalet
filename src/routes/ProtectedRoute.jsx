// @ts-nocheck
import React, { useCallback, useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { warningNofity } from '../Constant/Constant';

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const location  = useLocation()
    const userDetl = sessionStorage.getItem('userDetl');
    const auth_token = userDetl ? true : false;
    return (auth_token !== null && auth_token !== undefined && auth_token === true)
        ? <Outlet />
        : <Navigate to="/" replace />
}

export default ProtectedRoute

