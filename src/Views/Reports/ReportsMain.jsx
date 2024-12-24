import { Box, Typography } from '@mui/joy'
import { Button, Paper, Tooltip } from '@mui/material'
import { Grid } from '@mui/joy';
import React, { lazy, memo } from 'react'
import { ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom';




const ReportHeader = lazy(()=>import("../../Components/ReportHeader"));

function ReportsMain() {
    const routers = [
        { name: 'Daily Vehicle Registration', path: '/Reports/vehicle' },
        { name: 'Driver Attendace Report', path: '/Reports/Attendance' },
        { name: 'Employee Vise Revenue Report', path: '/Reports/Revenue' }
    ]

    return (
        <Box sx={{ height: window.innerHeight - 100, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1 }}>
            <ToastContainer />
            <Paper elevation={3} sx={{ flex: 1, height: window.innerHeight - 120, position: 'relative', px: 1 }}>
                <ReportHeader name={'REPORTS'} path='/Home/Dashboard'/>
                <Grid container mb={1}>
                    {routers?.map((item, index) => (
                        <Grid
                            my={1}
                            key={index}
                            lg={6}
                            sm={6}
                            sx={{ width: '100%', height: 40 }}
                        >
                            <Box
                                sx={{
                                    width: '90%',
                                    height: 40, display: 'flex',
                                    alignItems: 'center',
                                    pl: 2, borderBottom: '1px solid #e9ecef',
                                    textTransform: 'uppercase',
                                    textDecoration: 'none',
                                    fontWeight: 500,
                                    '&:hover': {
                                        color: 'blue',
                                        textDecoration: 'none',
                                    },
                                }}>
                                <Link to={item.path} >{item.name}</Link>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Box>
    )
}

export default memo(ReportsMain)