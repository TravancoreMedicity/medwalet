import React from 'react';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Input from '@mui/joy/Input';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { useNavigate } from 'react-router-dom';
import { RequestPageOutlined } from '@mui/icons-material';




const logo = require("../assets/logo.png")

const newlogo = require("../assets/logo/medlogo.png")



const Header = ({ toggleDrawer, isSmallScreen }) => {
    const navigate = useNavigate()
    const gotoSerachPage = () => {
        navigate("/Home/search")
    }


    const hanldelogout = () => {
        console.log("logout successfully");

    }

    return (
        <Box sx={{
            width: '100%',
            height: '7vh',
            bgcolor: 'white',
            boxShadow: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: { sm: "space-between" },
            paddingLeft: { sm: 3 },
            position: 'sticky',
            top: 0,
            zIndex: 1100,
            bgcolor: '#53B6E7'
        }}>


            <Box sx={{
                width: { xs: '80%', sm: '35%', md: '50%', lg: '65%' }, height: '100%', display: 'flex',
                alignItems: 'center'
            }}>
                {!isSmallScreen && (
                    <Button onClick={toggleDrawer(true)} >
                        <MenuIcon sx={{ color: "white" }} />
                    </Button>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', fontSize: { xs: 14, sm: 18 }, fontWeight: 500, color: 'black', width: "100%", position: 'relative' }}>
                    <img src={newlogo} width={30} height={30} />
                    <Typography sx={{ fontFamily: 'Roboto', mt: 1 }}>TRAVANCORE MEDICITY</Typography>
                </Box>
            </Box>
            <Box sx={{
                width: { xs: '20%', sm: '65%', md: '50%', lg: '35%' }, height: '100%', display: 'flex',
                alignItems: 'center'
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
                            px: 2
                        }}>
                            <Input sx={{ width: 400, fontSize: 14 }} placeholder='Enter VehicleNo/Cust MobNo' />
                            {/* <Tooltip  title="Go to settings">
                                <SettingsSuggestIcon sx={{ cursor: 'pointer', color: 'white' }} onClick={() => navigate("/Home/settings")} />
                            </Tooltip> */}
                            <LogoutIcon sx={{ cursor: 'pointer', color: 'white' }} onClick={hanldelogout} />
                        </Box>
                    ) : (
                        <Box sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'end',
                        }} >
                            <Button onClick={gotoSerachPage} >
                                <SearchSharpIcon sx={{ color: "white" }} />
                            </Button>
                        </Box>
                    )
                }
            </Box>

        </Box>
    );
};

export default Header;
