import { Table, TableContainer, TableHead, TableRow, withStyles, makeStyles, TableCell, Paper, TableBody, Button } from '@material-ui/core';
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
    },
    button: {
      borderRadius: 0
    }
  });

const OrdersTable = () => {
    const classes = useStyles();
    const [orders, setOrders] = React.useState([]);
    const {token} = useSelector(state => state.user);

    React.useEffect(() => {
      axios.get('http://localhost:5000/api/cart', { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.data)
        .then(orders => setOrders(orders.filter(order => order.status !== 'active')));
    }, []);
   
    const handleConfirm = id => {
        axios.put(`http://localhost:5000/api/cart/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } })
            .then(r => r.data)
            .then(cart => {
                setOrders(orders => orders.map(order => {
                    if(cart.id === order.id) order.status = 'confirmed';
                    return order;
                }))
            })
    }

    const handleReject = id => {
        axios.delete(`http://localhost:5000/api/cart/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(r => r.data)
            .then(() => {
                setOrders(orders => orders.map(order => {
                    if(id === order.id) order.status = 'rejected';
                    return order;
                }))
            })
    }
    
    return (
      <TableContainer className={classes.container}>
        {orders && orders.length ?
        (
          <div>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right">ID</StyledTableCell>
                  <StyledTableCell align="right">State</StyledTableCell>
                  <StyledTableCell align="right">Total</StyledTableCell>
                  <StyledTableCell align="right">User ID</StyledTableCell>
                  <StyledTableCell align="left">Options</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="right">{row.id}</StyledTableCell>
                    <StyledTableCell align="right">{row.status}</StyledTableCell>
                    <StyledTableCell align="right">${row.total}</StyledTableCell>
                    <StyledTableCell align="right">{row.userId}</StyledTableCell>
                    <StyledTableCell align="left">
                        {row.status !== 'pending' 
                        ? 
                            ''
                        : 
                        (   
                            <>
                                <Button variant='contained' color='primary' style={{marginRight: '1em'}} onClick={() => handleConfirm(row.id)}>
                                    CONFIRM
                                </Button>
                                <Button variant='contained' color='secondary' onClick={() => handleReject(row.id)}>
                                    REJECT
                                </Button>
                            </>
                        )
                        }
                       
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : ''
        }
      </TableContainer>
    )
}

export default OrdersTable;
