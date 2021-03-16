import { Table, TableContainer, TableHead, TableRow, withStyles, makeStyles, TableCell, Paper, TableBody, Button } from '@material-ui/core'
import React from 'react'

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

  function createData(id, name, description) {
    return { id, name, description };
  }

  const rows = [
    createData(1, 'Agustin asd123121dsaa', 'Vazquezxcvxcvxcv2131231zxczxczx'), 
    createData(1, 'Agustin asd123121dsaa', 'Vazquezxcvxcvxcv2131231zxczxczx'), 
    createData(1, 'Agustin asd123121dsaa', 'Vazquezxcvxcvxcv2131231zxczxczx'), 
    createData(1, 'Agustin asd123121dsaa', 'Vazquezxcvxcvxcv2131231zxczxczx'), 
    createData(1, 'Agustin asd123121dsaa', 'Vazquezxcvxcvxcv2131231zxczxczx') 
  ];

  const useStyles = makeStyles({
    table: {
    },
    container: {
        flexGrow: 1
    }
  });

const CategoriesTable = () => {
    const classes = useStyles();
      

    return (
        <TableContainer className={classes.container}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">ID</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="left">Options</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="right">{row.id}</StyledTableCell>
                <StyledTableCell align="right">{row.name}</StyledTableCell>
                <StyledTableCell align="left">{row.description}</StyledTableCell>
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
      </TableContainer>
    )
}

export default CategoriesTable
