import { Table, TableContainer, TableHead, TableRow, withStyles, makeStyles, TableCell, Paper, TableBody, Button } from '@material-ui/core';
import React from 'react';
import axios from 'axios';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#38182F',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  function createData(name, lastName, email, isAdmin, createdAt) {
    return { name, lastName, email, isAdmin, createdAt };
  }

  const rows = [
    createData('Agustin', 'Vazquez', 'agufvazquez@gmail.com', true, '2014-12-14'),
    createData('Agustin', 'Vazquez', 'agufvazquez@gmail.com', true, '2014-12-14'),
    createData('Agustin', 'Vazquez', 'agufvazquez@gmail.com', false, '2014-12-14'),
    createData('Agustin', 'Vazquez', 'agufvazquez@gmail.com', true, '2014-12-14'),
    createData('Agustin', 'Vazquez', 'agufvazquez331411@gmail.com', false, '2014-12-14'),
    createData('Agustin', 'Vazquez', 'agufvazquez@gmail.com', false, '2014-12-14'),
    createData('Agustindddd', 'Vazquez', 'agufvazquez@gmail.com', false, '2014-12-14'),
    createData('Agustin', 'Vazquez', 'agufvazquez@gmail.com', true, '2014-12-14'),
    createData('Agustin', 'Vazquez', 'agufvazquez@gmail.com', true, '2014-12-14'),
    createData('Agustin', 'Vazquez', 'agufvazquez@gmail.com', false, '2014-12-14'),
    createData('Agustin', 'Vazquez', 'agufvazquez@gmail.com', true, '2014-12-14'),
    createData('Agustin', 'Vazquez', 'agufvazquez331411@gmail.com', false, '2014-12-14'),
    createData('Agustin', 'Vazquez', 'agufvazquez@gmail.com', false, '2014-12-14'),
    createData('Agustindddd', 'Vazquez', 'agufvazquez@gmail.com', false, '2014-12-14'),
    createData('Agustin', 'Vazquez', 'agufvazquez@gmail.com', true, '2014-12-14'),
    createData('Agustin', 'Vazquez', 'agufvazquez@gmail.com', true, '2014-12-14'),
    createData('Agustin', 'Vazquez', 'agufvazquez@gmail.com', false, '2014-12-14'),
    createData('Agustin', 'Vazquez', 'agufvazquez@gmail.com', true, '2014-12-14'),
    createData('Agustin', 'Vazquez', 'agufvazquez331411@gmail.com', false, '2014-12-14'),
    createData('Agustin', 'Vazquez', 'agufvazquez@gmail.com', false, '2014-12-14'),
    createData('Agustindddd', 'Vazquez', 'agufvazquez@gmail.com', false, '2014-12-14')
  ];

  const useStyles = makeStyles({
    table: {
    },
    container: {
        flexGrow: 1
    }
  });

const UserTable = () => {
    const classes = useStyles();
    const [users, setUsers] = React.useState([])
    
    React.useEffect(() => {
      axios.get('url')
        .then(r => r.data)
        .then(users => setUsers(users));
    }, [])
    
    const buttonColor = (isAdmin) => {
        const style = { color: '#F7F7FF', fontWeight: 'bold'};

        if(isAdmin) style.backgroundColor = '#40bf80';
        else style.backgroundColor = '#ff6666';

        return style;
    }    

    return (
      <TableContainer className={classes.container}>
        {users && users.length ?
        (
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">First name</StyledTableCell>
                <StyledTableCell align="right">Lastname</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">isAdmin</StyledTableCell>
                <StyledTableCell align="left">Created at</StyledTableCell>
                <StyledTableCell align="left">Options</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="right">{row.name}</StyledTableCell>
                  <StyledTableCell align="right">{row.lastName}</StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">
                      <Button variant='contained' style={buttonColor(row.isAdmin)}>{row.isAdmin ? 'true' : 'false'}</Button>
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.createdAt}</StyledTableCell>
                  <StyledTableCell align="left">
                      <Button variant='contained' color='secondary' style={{marginRight: '1em'}}>
                          DELETE
                      </Button>
                      <Button variant='contained' color='primary'>
                          UPDATE
                      </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        ) : ''
        }    
      </TableContainer>
    )
}

export default UserTable
