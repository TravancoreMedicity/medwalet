import { Grid } from '@mui/joy'
import { Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SettingMenu() {
    const array = [
        {name:"User  Master",path:'/User/Dashboard'},
        {name:"Module Master",path:'/User/ModuleMaster'},
        {name:"Menu Master",path:'/User/MenuMaster'},
        {name:"Module Group Master",path:'/User/Dashboard'},
    ]
    return (
        <Grid container sx={{ width: '100%', flexWrap: 'wrap' }} spacing={1}>
            {
                array?.map((item, index) => {
                    return (
                        <Grid
                            item
                            lg={2} md={4} sm={6} xs={12}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '50px',
                                mb: 1
                            }}
                            key={index}
                        >
                            <Box sx={{ 
                                width: '90%',
                                 height: '40px',
                                 display: 'flex',
                                alignItems: 'center',
                                 
                                 }} >
                                <Link to={item.path}>{item.name}</Link>
                            </Box>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}
