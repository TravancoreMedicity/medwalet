import React, { useEffect, useState, useMemo } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { errorNofity, warningNofity } from '../Constant/Constant';
import { axioslogin } from '../AxiosConfig/Axiox';
import CircularProgressThickness from '../Components/CircularProgress'

const ProtectedRoute = () => {
    const [valid, setValid] = useState(null);  

    const userDetl = useMemo(() => {
        return JSON.parse(sessionStorage.getItem('userDetl'));
    }, []); 

    useEffect(() => {
        const sessionLogin = async () => {
            if (!userDetl) {
                setValid(false);
                return;
            }
            const controller = new AbortController();
            try {
                const response = await axioslogin.get('/validateToken', {
                    signal: controller.signal,
                });

                const { status } = response.data;
                if (status === 101) {
                    sessionStorage.removeItem('userDetl');
                    warningNofity("Token Expired. Please login.");
                    setValid(false);
                } else {
                    setValid(true);
                }
            } catch (error) {
                errorNofity("Token Validation Error.");
                setValid(false);
            } finally {
                controller.abort();
            }
        };

        sessionLogin();
    }, [userDetl]);

    if (valid === null) {
        return <CircularProgressThickness />;
    }

    return valid ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;
