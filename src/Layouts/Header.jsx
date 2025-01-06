import React from 'react';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { useNavigate } from 'react-router-dom';



const newlogo = require("../assets/logo/medlogo.png")

const Header = ({ toggleDrawer, isSmallScreen }) => {

    const navigate = useNavigate()
    const gotoSerachPage = () => {
        navigate("/Home/search")
    }   

    const hanldelogout = () => {
        sessionStorage.removeItem('userDetl');
        navigate('/')
    }

    return (
        <Box sx={{
            width: '100%',
            height: '7vh',
            boxShadow: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: { sm: "space-between" },
            paddingLeft: { sm: 3 },
            position: 'sticky',
            top: 0,
            zIndex: 1100,
            bgcolor: '#53B6E7',
            px: 1
        }}>
            <Box sx={{
                width: { xs: '80%', sm: '45%', md: '50%', lg: '65%' }, height: '100%', display: 'flex',
                alignItems: 'center',
            }}>
                {!isSmallScreen && (
                    <Button onClick={toggleDrawer(true)} >
                        <MenuIcon sx={{ color: "white" }} />
                    </Button>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', fontSize: { xs: 14, sm: 18 }, fontWeight: 500, color: 'black', width: "100%", position: 'relative' }}>
                    <img
                        src={newlogo}
                        width={30}
                        height={30}
                        alt='medicity-logo'
                    />
                    <Typography sx={{ fontFamily: 'Roboto', mt: 1 }}>Travancore Medicity</Typography>
                </Box>
            </Box>
            <Box sx={{
                width: {
                    xs: '30%',
                    sm: '50%',
                    md: '50%',
                    lg: '25%'
                }, height: '100%',
                display: 'flex',
                alignItems: 'center',
            }}>
                {
                    !isSmallScreen ? (
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'end',
                            gap: 3,
                            px: 2,

                        }}>
                            {/* <Input sx={{ width: 400, fontSize: 14 }} placeholder='Search here!'
                                onClick={() => navigate("/Home/search")} /> */}

                            <Tooltip title="Search Vehicles">
                                <SearchSharpIcon
                                    sx={{ color: "white", cursor: 'pointer' }}
                                    onClick={() => navigate("/Home/search")}
                                />
                            </Tooltip>
                            <Tooltip title="Logout">
                                <LogoutIcon sx={{ cursor: 'pointer', color: 'white' }} onClick={hanldelogout} />
                            </Tooltip>
                        </Box>
                    ) : (
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'end',
                        }} >
                            <Button
                                onClick={gotoSerachPage} >
                                <SearchSharpIcon
                                    sx={{
                                        color: "white"
                                    }}
                                />
                            </Button>
                            <Tooltip title="Logout Now">
                                <LogoutIcon
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'white',
                                        fontSize: 19
                                    }}
                                    onClick={hanldelogout}
                                />
                            </Tooltip>
                        </Box>
                    )
                }


            </Box>
        </Box>
    );
};

export default Header;
