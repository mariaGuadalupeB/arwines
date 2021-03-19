import React from 'react'
import {makeStyles, Typography, Box, IconButton, FormControl, NativeSelect, FormHelperText, TextField, Button } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import axios from 'axios';
import {useSelector} from 'react-redux';

const useStyles = makeStyles(theme => ({
    box: {
        height: '30em',
        width: '30em',
        backgroundColor: '#e6e6e6',
        position: 'absolute',
        zIndex: 1,
        borderRadius: '1em',
        padding: '2em',
        margin: '4em',
        border: '0.5em solid black',
        position: 'absolute',
        zIndex: 2
    },
    textfield: {
        margin: '0.3em',
        backgroundColor: 'white'
    },
    form: {
        flexGrow: 1,
        display: 'flex', 
        flexDirection: 'column'
    },
    categories: {
        margin: '0.3em',
        width: '29.2em',
        backgroundColor: 'white'
    },
    button: {
        color: 'red',
        alignSelf: 'flex-end'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
    }
}));

// selectedProduct["cart_items.product.id"])

const AddReview = ({handleOpenAddReview, selectedProduct, handleTriggerUpdateList}) => {
    const styles = useStyles();
    const [rating, setRating] = React.useState(0);
    const [comment, setComment] = React.useState('');
    const {token} = useSelector(state => state.user);

    const handleChangeRating = e => {
        setRating(parseInt(e.target.value));
    }

    const handleChangeComment = e => {
        setComment(e.target.value);
    }

    const consoleProps = product => {
        console.log(Object.keys(product))
    }

    const handleAddReview = () => {
        const review = {
            productId: selectedProduct["cart_items.product.id"],
            comment,
            rating
        }

        axios.post('http://localhost:5000/api/review', review, { headers: { Authorization: `Bearer ${token}` } })
            .then(r => r.data)
            .then(() => {
                console.log('review a;adida')
                handleTriggerUpdateList();
                handleOpenAddReview();
            })
    }


    return (
        <>
            {selectedProduct && consoleProps(selectedProduct)}
            {selectedProduct && console.log(selectedProduct)}
            <Box className={styles.box} display='flex' flexDirection='column'>
                <IconButton className={styles.button} onClick={handleOpenAddReview}>
                    <CancelIcon/>
                </IconButton>
                <form className={styles.form}>
                    <Typography variant="h6" color="initial">Add review:</Typography>
                    <Typography variant="body2" color="initial">{selectedProduct && selectedProduct["cart_items.product.name"]}</Typography>
                    <FormControl className={styles.formControl}>
                        <NativeSelect
                        onChange={handleChangeRating}
                        value={rating}
                        name="rating"
                        className={styles.selectEmpty}
                        inputProps={{ 'aria-label': 'age' }}
                        >
                        <option value="">-</option>
                        <option value={1}>One</option>
                        <option value={2}>Two</option>
                        <option value={3}>Three</option>
                        <option value={4}>Four</option>
                        <option value={5}>Five</option>
                        </NativeSelect>
                        <FormHelperText>RATING</FormHelperText>
                    </FormControl>
                    <TextField 
                        label="Comment" 
                        variant="outlined" 
                        name='comment' 
                        className={styles.textfield} 
                        multiline 
                        rows={7}
                        onChange={handleChangeComment}
                        value={comment}
                    />
                </form>
                <Button variant='contained' color='primary' fullWidth style={{marginTop: '1em'}} onClick={handleAddReview}>ADD!</Button>
            </Box>
        </>
    )
}


export default AddReview
