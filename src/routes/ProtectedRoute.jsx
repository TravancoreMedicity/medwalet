// @ts-nocheck
import React, { useCallback, useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { errorNofity, warningNofity } from '../Constant/Constant';
import { axioslogin } from '../AxiosConfig/Axiox';
import { useQuery } from '@tanstack/react-query';

const ProtectedRoute = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isnotexpired, setIsNotExpired] = useState(false)
    const userDetl = sessionStorage.getItem('userDetl');
    const auth_token = userDetl ? true : false;

    /***
     * api. -> validate token
     * 
     * const res = api.get('validateToken')
     * 
     * 101
     * 106
     * 
     * 
     * **/


    const { success, data:IsTokenNotExpired } = useQuery({
        queryKey: ['tokenvalidate'],
        queryFn: () => handleTokenValidateCheck()
    })
    
    const handleTokenValidateCheck = useCallback(async () => {
        try {
            const response = await axioslogin.get('/validateToken');
            const { status, message } = response.data;  
            if (status === 101) {
                warningNofity("Token Expired Please login")
                sessionStorage.removeItem('userDetl');
                navigate('/')
                return false
            }else{
                return true
            }
        } catch (error) {
            errorNofity("Token Validation Error")
        }
    })

    return (auth_token !== null && auth_token !== undefined && auth_token === true && IsTokenNotExpired)
        ? <Outlet />
        : <Navigate to="/" replace />
}

export default ProtectedRoute

