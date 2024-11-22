import { Grid, Box, Typography } from '@mui/joy';
import React, { lazy } from 'react';
import logo from "../../assets/MEDICAL COLLEGE LOGO.png"

const Loginform = lazy(()=>import('./Loginform'))

// const logo = require("../../assets/MEDICAL COLLEGE LOGO.png")



function Login() {

    const boxStyles = {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: {xs:'end',sm:'center'},
        flexDirection: 'column',
        textAlign: 'center',
        paddingTop: 2,
        paddingTop: { sm: 10, md: 0 },
      };
    
      const boxStyles2 = {
        ...boxStyles, 
        alignItems: { lg: 'flex-start', sm: 'center', xs: 'center' },
        justifyContent: { xs: 'flex-start', sm: 'center' },
        width: '100%',
      };
    
      const typographyStyles = {
        width: '300px',
        mt: { xs: 2, sm: 0 },
        fontFamily: { xs: 'fantasy', sm: 'cursive' },
        fontWeight: { xs: 700, sm: 400 },
        color: '#3C3D37',
        fontSize: { xs: 10, sm: 16 },
        display: { xs: 'none', sm: 'block' },
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
            <Grid  xs={12} sm={12} md={6} sx={{ height: { xs: '40vh', sm: '20vh', md: "100%" } }}>
                <Box sx={boxStyles}>
                    <Box sx={{  width: { xs: 220, sm: 400 }, height: { xs: 120, sm: 150 } }} >
                        <img
                            src={logo}
                            alt=""
                            width={'100%'}
                            height={'100%'}
                        />
                    </Box>
                    <Typography sx={typographyStyles}>
                        Hospital Parking Management System <br />
                        Hi, Welcome Back ! <br />
                        Enter your credentials to continue</Typography>
                </Box>
            </Grid>
            <Grid  xs={12} sm={12} md={6} sx={{ height: { xs: '60vh', sm: '70vh', md: "100%" } }}>
                <Box sx={boxStyles2}>
                    <Loginform />
                </Box>
            </Grid>
        </Grid>
    );
}

export default Login;
