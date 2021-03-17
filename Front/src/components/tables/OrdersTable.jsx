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
    

    /* React.useEffect(() => {
      axios.get('http://localhost:5000/api/category')
        .then(r => r.data)
        .then(categories => setCategories(categories));
    }, []); */
   

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
                  <StyledTableCell align="left">Total</StyledTableCell>
                  <StyledTableCell align="left">User ID</StyledTableCell>
                  <StyledTableCell align="left">Options</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="right">{row.id}</StyledTableCell>
                    <StyledTableCell align="right">{row.status}</StyledTableCell>
                    <StyledTableCell align="left">{row.total}</StyledTableCell>
                    <StyledTableCell align="left">{row.userID}</StyledTableCell>
                    <StyledTableCell align="left">
                        <Button variant='contained' color='primary' style={{marginRight: '1em'}}>
                            CONFIRM
                        </Button>
                        <Button variant='contained' color='secondary'>
                            REJECT
                        </Button>
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
