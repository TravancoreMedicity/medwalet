import * as React from 'react';
import Table from '@mui/joy/Table';
import { Box } from '@mui/joy'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Tooltip from '@mui/material/Tooltip';
import { Paper } from '@mui/material';

function createData(slNo, name, status) {
    return { name, slNo, status, };
}

const rows = [
    createData(1, "ADMIN", 0),
    createData(2, "USER", 1),
    createData(3, "DRIER", 1),
    createData(4, "STAFF", 0),
    createData(5, "WE WORK STAFF", 1),
    createData(6, "TEST DATA", 1),

];

export default function UserTable({ setGroupName, setGroupStatus }) {
    const [selectedRow, setSelectedRow] = React.useState(null)
    const handleselection = React.useCallback((row) => {
        if (selectedRow === row.slNo) {
            setSelectedRow(null);
            setGroupName("");
            setGroupStatus(false);
        } else {
            setSelectedRow(row.slNo);
            setGroupName(row.name);
            setGroupStatus(row.status === 1 ? true : false)
        }
    }, [selectedRow])


    return (
        <Box sx={{
            width: '70%', height: '100%', px: 2, py: 2,
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
                display: 'none',
            },
            scrollbarWidth: 'none',
        }}>
            <Paper>
                <Table borderAxis="both">
                    <thead>
                        <tr>
                            <th style={{ width: '20%' }}>SlNo</th>
                            <th style={{ width: '40%' }}>Group Name</th>
                            <th>Group Status</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr
                                key={row.slNo}
                                style={{
                                    backgroundColor: selectedRow === row.slNo ? '#f5f3f4' : 'transparent',
                                }}
                            >
                                <td>{row.slNo}</td>
                                <td>{row.name}</td>
                                <td>{row.status === 0 ? "Not Active" : 'Active'}</td>
                                <td style={{ cursor: 'pointer' }} onClick={() => handleselection(row)}>
                                    <Tooltip title="Edit Group">
                                        <EditOutlinedIcon sx={{
                                            color: selectedRow === row.slNo ? 'blue' : ''
                                        }} />
                                    </Tooltip>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Paper>
        </Box>
    );
}
