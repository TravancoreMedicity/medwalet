// @ts-nocheck
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const auth_token = true
    return (auth_token !== null && auth_token !== undefined && true) ? <Outlet /> : <Navigate to="/" replace />
}

export default ProtectedRoute