import { Grid, Box, Typography } from '@mui/joy';
import React, { lazy, memo, Suspense } from 'react';
import newicon from '../../assets/logo/newicon.png'
import { Navigate, useLocation } from 'react-router-dom';
import LoginSkeleton from '../../Components/LoginSkeleton';
import './style.css';

const Loginform = lazy(() => import('./Loginform'))

function Login() {
    const userDetl = sessionStorage.getItem('userDetl');
    const location = useLocation();

    if (userDetl && location.pathname === '/') {
        return <Navigate to="/Home/Dashboard" replace />;
    };


    return (
        <Grid
            container
            alignItems="stretch"
            justifyContent="center"
            sx={{
                width: '100%',
                height: '100vh',
            }}
        >
            <Grid xs={12} sm={12} md={6} sx={{ height: { xs: '40vh', sm: '20vh', md: "100%" } }}>
                <Box sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: { xs: 'end', sm: 'center' },
                    flexDirection: 'column',
                    textAlign: 'center',
                    paddingTop: 2,
                    paddingTop: { sm: 10, md: 0 },
                }}>
                    <Box sx={{ width: { xs: 200, sm: 220 }, height: { xs: 180, sm: 150 } }} >
                        <img
                            src={newicon}
                            alt=""
                            width={'100%'}
                            height={'100%'}
                        />
                    </Box>
                    <Typography sx={{
                        width: '300px',
                        mt: { xs: 2, sm: 4 },
                        fontFamily: { xs: 'fantasy', sm: 'cursive' },
                        fontWeight: { xs: 700, sm: 400 },
                        color: '#3C3D37',
                        fontSize: { xs: 10, sm: 16 },
                        display: { xs: 'none', sm: 'block' }
                    }}>
                        Hospital Parking Management System <br />
                        Hi, Welcome Back ! <br />
                        Enter your credentials to continue</Typography>
                </Box>
            </Grid>
            <Grid xs={12} sm={12} md={6} sx={{ height: { xs: '60vh', sm: '70vh', md: "100%" } }}>
                <Box sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: { xs: 'end', sm: 'center' },
                    flexDirection: 'column',
                    textAlign: 'center',
                    paddingTop: 2,
                    paddingTop: { sm: 10, md: 0 },
                    alignItems: { lg: 'flex-start', sm: 'center', xs: 'center' },
                    justifyContent: { xs: 'flex-start', sm: 'center' },
                    width: '100%',
                }}>
                    <Suspense fallback={<LoginSkeleton />}>
                        <Loginform />
                    </Suspense>
                </Box>
            </Grid>
        </Grid>
    );
}

export default memo(Login);
