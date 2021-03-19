import { Table, TableContainer, TableHead, TableRow, withStyles, makeStyles, TableCell, TableBody, Button } from '@material-ui/core';
import React from 'react';
import axios from 'axios';
import AddProduct from '../AddProduct';
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

const ProductsTable = () => {
    const classes = useStyles();
    const [products, setProducts] = React.useState([]);
    const [openAddProduct, setOpenAddProduct] = React.useState(false);
    const [openEditProduct, setOpenEditProduct] = React.useState(false)
    const {token} = useSelector(state => state.user);
    const [selectedProduct, setSelectedProduct] = React.useState({});

    React.useEffect(() => {
      axios.get('http://localhost:5000/api/product')
        .then(r => r.data)
        .then(products => setProducts(products));
    }, [])

    const toggleAddProductWindow = () => {
      setOpenAddProduct(!openAddProduct);
    }

    const toggleEditProductWindow = product => {
      setSelectedProduct(product);
      setOpenEditProduct(!openEditProduct);
    }

    const handleDelete = id => {
      axios.delete(`http://localhost:5000/api/product/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.data)
        .then(() => {
          setProducts(products => products.filter(product => product.id !== id));
        })
    } 

    return (
        <TableContainer className={classes.container}>
        {
          products && products.length ?
          (
          <div>
             <Button variant='contained' color='primary' fullWidth onClick={toggleAddProductWindow} className={classes.button}>Add product</Button>
            {openEditProduct ? <AddProduct toggleAddProductWindow={toggleEditProductWindow} setProducts={setProducts} products={products} selectedProduct={selectedProduct}/> : ''}
            {openAddProduct ? <AddProduct toggleAddProductWindow={toggleAddProductWindow} setProducts={setProducts} products={products}/> : ''}
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right">ID</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Description</StyledTableCell>
                  <StyledTableCell align="right">Weight</StyledTableCell>
                  <StyledTableCell align="right">Quantity</StyledTableCell>
                  <StyledTableCell align="right">Price</StyledTableCell>
                  <StyledTableCell align="left">Image path</StyledTableCell>
                  <StyledTableCell align="left">Options</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="right">{row.id}</StyledTableCell>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center" style={{width: '42em'}}>{row.description}</StyledTableCell>
                    <StyledTableCell align="right">{row.weight}</StyledTableCell>
                    <StyledTableCell align="right">{row.quantity}</StyledTableCell>
                    <StyledTableCell align="right">${row.price}</StyledTableCell>
                    <StyledTableCell align="left">{row.image_path}</StyledTableCell>
                    <StyledTableCell align="left">
                        <Button variant='contained' color='secondary' style={{marginRight: '1em'}} onClick={() => handleDelete(row.id)}>
                            DELETE
                        </Button>
                        <Button variant='contained' color='primary' onClick={() => toggleEditProductWindow(row)}>
                            UPDATE
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

export default ProductsTable
