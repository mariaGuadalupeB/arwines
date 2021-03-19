import { Table, TableContainer, TableHead, TableRow, withStyles, makeStyles, TableCell, TableBody, Button } from '@material-ui/core';
import React from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';

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

  const useStyles = makeStyles({
    table: {
    },
    container: {
        flexGrow: 1
    }
  });

const UserTable = () => {
    const classes = useStyles();
    const user = useSelector(state => state.user);
    const [users, setUsers] = React.useState([]);
    
    React.useEffect(() => {
      axios.get('http://localhost:5000/api/user', { headers: { Authorization: `Bearer ${user.token}` } })
        .then(r => r.data)
        .then(users => setUsers(users));
    }, [])
    
    const buttonColor = (isAdmin) => {
        const style = { color: '#F7F7FF', fontWeight: 'bold'};

        if(isAdmin) style.backgroundColor = '#40bf80';
        else style.backgroundColor = '#ff6666';

        return style;
    }    

    const handleDelete = id => {
      axios.delete(`http://localhost:5000/api/user/${id}`, { headers: { Authorization: `Bearer ${user.token}` } })
        .then(r => r.data)
        .then(data => {
          setUsers(users => users.filter(user => user.id !== id));
        });
    }

    const handleChangeAdmin = id => {
      axios.put(`http://localhost:5000/api/user/${id}`, {} ,{ headers: { Authorization: `Bearer ${user.token}` } })
        .then(r => r.data)
        .then(userChanged => {
          setUsers(users => users.map(user => {
            if(id === user.id) user.admin = !user.admin;
            return user;
          }))
        })
    }

    return (
      <TableContainer className={classes.container}>
        {users && users.length ?
        (<div>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right">ID</StyledTableCell>
                  <StyledTableCell align="right">First name</StyledTableCell>
                  <StyledTableCell align="right">Lastname</StyledTableCell>
                  <StyledTableCell align="right">Email</StyledTableCell>
                  <StyledTableCell align="right">isAdmin</StyledTableCell>
                  <StyledTableCell align="left">Created at</StyledTableCell>
                  <StyledTableCell align="left">Options</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="right">{row.id}</StyledTableCell>
                    <StyledTableCell align="right">{row.firstName}</StyledTableCell>
                    <StyledTableCell align="right">{row.lastName}</StyledTableCell>
                    <StyledTableCell align="right">{row.email}</StyledTableCell>
                    <StyledTableCell align="right">
                        {user.id === row.id ? '' : <Button variant='contained' style={buttonColor(row.admin)} onClick={() => handleChangeAdmin(row.id)}>{row.admin ? 'true' : 'false'}</Button> }
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.createdAt && row.createdAt.slice(0, 10)}</StyledTableCell>
                    <StyledTableCell align="left">
                      {user.id === row.id ? '' : (
                        <Button variant='contained' color='secondary' style={{marginRight: '1em'}} onClick={() => handleDelete(+row.id)}>
                        DELETE
                        </Button>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            {/* <Button variant='contained' color='primary' fullWidth>Add user</Button> */}
          </div>
        ) : ''
        }    
      </TableContainer>
    )
}

export default UserTable
