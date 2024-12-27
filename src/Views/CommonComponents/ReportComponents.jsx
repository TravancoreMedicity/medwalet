import { Box, CssVarsProvider, IconButton, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback } from 'react'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CloseIcon from '@mui/icons-material/Close';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { useNavigate } from 'react-router-dom';

const ReportComponents = ({ children, title, displayClose, data, path ,onDownload}) => {

    const navigate = useNavigate()

    const toRedirectToHome = useCallback(async () => {
        navigate(path)
    }, [path])

    return (
        <Box sx={{ flex: 1, p: 1 }} >
            <Paper sx={{ flex: 1, height: window.innerHeight - 90 }} >
                <Paper square sx={{ display: "flex", height: 30, flexDirection: 'column', bgcolor: 'indigo' }}>
                    <Box sx={{ display: "flex", flex: 1, height: 30 }} >
                        <Paper square sx={{
                            display: "flex", flex: 1, height: 40, pl: 1,
                            alignItems: 'center'
                        }} >
                            <Box sx={{ display: "flex", flex: 1 }}>
                                <ContentPasteIcon sx={{ color: 'grey' }} />
                                <CssVarsProvider>
                                    <Typography sx={{ display: 'flex', fontWeight: 500, ml: 1 }} >
                                        {title}
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Tooltip title="Download" followCursor placement='top' arrow >
                                <Box sx={{ display: "flex", pr: 1, py: 1 }}>

                                    <IconButton
                                        variant="outlined"
                                        size='sm'
                                        color='primary'
                                        onClick={onDownload}
                                        sx={{ color: '#347aeb' }}
                                    >
                                        <ArrowDownwardIcon />
                                    </IconButton>

                                </Box>
                            </Tooltip>
                            <Box sx={{ display: "flex", pr: 1, py: 1 }}>

                                {
                                    displayClose &&
                                    <IconButton
                                        variant="outlined"
                                        size='sm'
                                        color="danger"
                                        onClick={toRedirectToHome}
                                        sx={{ color: '#ef5350' }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                }

                            </Box>
                        </Paper>
                    </Box>
                </Paper>
                <Box sx={{  flex: 1, py: 0.5     }} >
                    {children}
                </Box>
            </Paper>
        </Box>
    )
}

export default memo(ReportComponents) 