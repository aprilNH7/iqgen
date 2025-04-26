import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Avatar, Box, Checkbox, Typography } from '@mui/material';

function createData(role, name, imgUrl, email) {
    return { role, name, imgUrl, email };
}
const rows = [
    createData('EPC', 'Alisya K.', 'https://via.placeholder.com/30', 'alisya@example.com'),
    createData('Sales', 'Jack O. P', 'https://via.placeholder.com/30', 'jack@example.com'),
    createData('EPC', 'Catilyn A.', 'https://via.placeholder.com/30', 'catilyn@example.com'),
    createData('Sales', 'Franklin G.', 'https://via.placeholder.com/30', 'franklin@example.com'),
    createData('Office', 'Alana S.', 'https://via.placeholder.com/30', 'alana@example.com'),
    createData('Manager', 'Norman T.', 'https://via.placeholder.com/30', 'norman@example.com'),
    createData('Admin', 'Elsa J.', 'https://via.placeholder.com/30', 'elsa@example.com'),
];

const AccessManagerTable = ({ user }) => {
    const [selectedRows, setSelectedRows] = React.useState({});
    const [selectAll, setSelectAll] = React.useState(false);

    const handleCheckboxChange = (event, email) => {
        setSelectedRows((prev) => ({
            ...prev,
            [email]: event.target.checked,
        }));
    };

    const handleSelectAllChange = (event) => {
        const checked = event.target.checked;
        setSelectAll(checked);
        const newSelectedRows = {};
        rows.forEach((row) => {
            newSelectedRows[row.email] = checked;
        });
        setSelectedRows(newSelectedRows);
    };

    return (
        <Box className='access-manager-table'>
            <Typography component='h2'>Access Manager</Typography>
            <Table className='access-table' aria-label="access manager table">
                <TableHead>
                    <TableRow>
                        <TableCell width="60%">
                            <Box className='checkbox'>
                                <Checkbox
                                    checked={selectAll}
                                    onChange={handleSelectAllChange}
                                    color="primary"
                                />
                                <Typography>Role</Typography>
                            </Box>
                        </TableCell>
                        <TableCell width="40%"><Typography>Name / Company</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => {
                        const isCurrentUser = user?.email === row.email;

                        return (
                            <TableRow
                                key={row.email}
                                sx={{
                                    backgroundColor: isCurrentUser ? '#f0f8ff' : 'inherit',
                                    '&:last-child td, &:last-child th': { border: 0 },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box className='checkbox'>
                                        <Checkbox
                                            checked={selectedRows[row.email] || false}
                                            onChange={(e) => handleCheckboxChange(e, row.email)}
                                            color="primary"
                                        />
                                        <Typography>{row.role}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box className='name'>
                                        <Avatar
                                            src={row.imgUrl}
                                            alt={row.name}
                                            sx={{ width: 22, height: 22 }}
                                        />
                                        <Typography>
                                            {row.name} {isCurrentUser && "(You)"}
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Box>
    );
};

export default AccessManagerTable;
