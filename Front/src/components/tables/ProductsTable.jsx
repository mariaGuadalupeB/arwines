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

  function createData(id, name, description, weight, quantity, price, image_path) {
    return { id, name, description, weight, quantity, price, image_path };
  }

  const rows = [
    createData(1, 'VINO TINTO MALBEC TERMIDOR', 'Alkjasdjsadkjasjkakqweqweoqwxzpcxppovpxcv', 4.5, 4, 1600, '/testingurl_imagepath'),
    createData(1, 'VINO TINTO MALBEC TERMIDOR', 'Alkjasdjsadkjasjkakqweqweoqwxzpcxppovpxcv', 4.5, 4, 1600, '/testingurl_imagepath'),
    createData(1, 'VINO TINTO MALBEC TERMIDOR', 'Alkjasdjsadkjasjkakqweqweoqwxzpcxppovpxcv', 4.5, 4, 1600, '/testingurl_imagepath'),
    createData(1, 'VINO TINTO MALBEC TERMIDOR', 'Alkjasdjsadkjasjkakqweqweoqwxzpcxppovpxcv', 4.5, 4, 1600, '/testingurl_imagepath'),
    createData(1, 'VINO TINTO MALBEC TERMIDOR', 'Alkjasdjsadkjasjkakqweqweoqwxzpcxppovpxcv', 4.5, 4, 1600, '/testingurl_imagepath'),
    createData(1, 'VINO TINTO MALBEC TERMIDOR', 'Alkjasdjsadkjasjkakqweqweoqwxzpcxppovpxcv', 4.5, 4, 1600, '/testingurl_imagepath'),
    createData(1, 'VINO TINTO MALBEC TERMIDOR', 'Alkjasdjsadkjasjkakqweqweoqwxzpcxppovpxcv', 4.5, 4, 1600, '/testingurl_imagepath'),
    createData(1, 'VINO TINTO MALBEC TERMIDOR', 'Alkjasdjsadkjasjkakqweqweoqwxzpcxppovpxcv', 4.5, 4, 1600, '/testingurl_imagepath'),
    createData(1, 'VINO TINTO MALBEC TERMIDOR', 'Alkjasdjsadkjasjkakqweqweoqwxzpcxppovpxcv', 4.5, 4, 1600, '/testingurl_imagepath'),
    createData(1, 'VINO TINTO MALBEC TERMIDOR', 'Alkjasdjsadkjasjkakqweqweoqwxzpcxppovpxcv', 4.5, 4, 1600, '/testingurl_imagepath'),
    createData(1, 'VINO TINTO MALBEC TERMIDOR', 'Alkjasdjsadkjasjkakqweqweoqwxzpcxppovpxcv', 4.5, 4, 1600, '/testingurl_imagepath')
  ];

  const useStyles = makeStyles({
    table: {
    },
    container: {
        flexGrow: 1
    }
  });

const ProductsTable = () => {
    const classes = useStyles();    

    return (
        <TableContainer className={classes.container}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">ID</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Weight</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="left">Image path</StyledTableCell>
              <StyledTableCell align="left">Options</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="right">{row.id}</StyledTableCell>
                <StyledTableCell align="right">{row.name}</StyledTableCell>
                <StyledTableCell align="right">{row.description}</StyledTableCell>
                <StyledTableCell align="right">{row.weight}</StyledTableCell>
                <StyledTableCell align="right">{row.quantity}</StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
                <StyledTableCell align="left">{row.image_path}</StyledTableCell>
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

export default ProductsTable
