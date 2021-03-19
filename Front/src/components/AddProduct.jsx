import React from 'react'
import {Box, makeStyles, Button, TextField, Typography, IconButton} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import axios from 'axios';
import {useSelector} from 'react-redux';

const useStyles = makeStyles(theme => ({
    box: {
        height: '35em',
        width: '35em',
        backgroundColor: '#e6e6e6',
        position: 'absolute',
        zIndex: 1,
        borderRadius: '1em',
        padding: '2em',
        margin: '4em',
        border: '0.5em solid black'
    },
    textfield: {
        margin: '0.3em',
        backgroundColor: 'white'
    },
    form: {
        flexGrow: 1
    },
    categories: {
        margin: '0.3em',
        width: '29.2em',
        backgroundColor: 'white'
    },
    button: {
        color: 'red',
        alignSelf: 'flex-end'
    }
}));

const AddProduct = ({toggleAddProductWindow, setProducts, products, selectedProduct}) => {
    const styles = useStyles();
    const {token} = useSelector(state => state.user)

    const [newProduct, setNewProduct] = React.useState(selectedProduct || {
                                            name: '',
                                            description: '',
                                            weight: 0,
                                            quantity: 0,
                                            price: 0,
                                            image_path: '',
                                            categories: ''
                                        })


    const handleChange = e => {
        setNewProduct(newProduct => ({...newProduct, [e.target.name]: e.target.value}))
    };

    const handlePostNewProduct = product => {
        if(!product.name.trim().length || !product.description.trim().length || !product.weight|| !product.quantity|| !product.price || !product.image_path.trim().length) return;
        
        if(typeof product.categories === 'string') product.categories = product.categories.split(',');
        
        if(selectedProduct) {
            axios.put(`http://localhost:5000/api/product/${product.id}`, product, { headers: { Authorization: `Bearer ${token}` } })
            .then(r => r.data)
            .then(productFromBack => {
                setProducts(products => products.map(productMap => {
                    if(productFromBack.id == productMap.id) return productFromBack;
                    return productMap;
                }));
                toggleAddProductWindow();
            });    
        } else {
            axios.post('http://localhost:5000/api/product', product, { headers: { Authorization: `Bearer ${token}` } })
            .then(r => r.data)
            .then(product => {
                setProducts([...products, product])
                toggleAddProductWindow();
            });
        }
        
    }

    return (
        <>
            <Box className={styles.box} display='flex' flexDirection='column'>
                <IconButton className={styles.button} onClick={toggleAddProductWindow}>
                    <CancelIcon/>
                </IconButton>
                <form className={styles.form}>
                    <Typography variant="h6" color="initial">{selectedProduct ? 'Edit product:' : 'Add product:'}</Typography>
                    <TextField label="Name" variant="outlined" name='name' className={styles.textfield} onChange={handleChange} value={newProduct.name}/>
                    <TextField label="Description" variant="outlined" name='description' className={styles.textfield} onChange={handleChange} value={newProduct.description}/>
                    <TextField label="Weight" variant="outlined" name='weight' className={styles.textfield} onChange={handleChange} value={newProduct.weight}/>
                    <TextField label="Quantity" variant="outlined" name='quantity' className={styles.textfield} onChange={handleChange} value={newProduct.quantity}/>
                    <TextField label="Price" variant="outlined" name='price' className={styles.textfield} onChange={handleChange} value={newProduct.price}/>
                    <TextField label="Image path" variant="outlined" name='image_path' className={styles.textfield} onChange={handleChange} value={newProduct.image_path}/>
                    { !selectedProduct ? <TextField label="Categories" variant="outlined" name='categories' className={styles.categories} fullWidth onChange={handleChange} value={newProduct.categories}/> : '' }
                </form>
                <Button variant='contained' color='primary' fullWidth onClick={() => handlePostNewProduct(newProduct)}>{selectedProduct ? 'EDIT!' : 'ADD!'}</Button>
            </Box>
        </>
    )
}

export default AddProduct
