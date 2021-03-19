import React from 'react'
import {Box, makeStyles, Button, TextField, Typography, IconButton} from '@material-ui/core';
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

const AddCategory = ({toggleAddCategoryWindow, categories, setCategories, selectedCategory}) => {
    const styles = useStyles();
    const {token} = useSelector(state => state.user);
    const [newCategory, setNewCategory] = React.useState(selectedCategory || {name: '', description: ''});

    const handleChange = e => {
        setNewCategory(newCategory => ({...newCategory, [e.target.name]: e.target.value}))
    };

    const handlePostNewCategory = category => {

        if(selectedCategory) {
            axios.put(`http://localhost:5000/api/category/${category.id}`, category, { headers: { Authorization: `Bearer ${token}` } })
            .then(r => r.data)
            .then(category => {
                setCategories(categories => categories.map(categoryMap => {
                    if(category.id == categoryMap.id) return category;
                    return categoryMap;
                }));
                toggleAddCategoryWindow();
            });
        } else {
            axios.post('http://localhost:5000/api/category', category, { headers: { Authorization: `Bearer ${token}` } })
            .then(r => r.data)
            .then(category => {
                setCategories([...categories, category])
                toggleAddCategoryWindow();
            });
        }     
        
    }

    return (
        <>
            <Box className={styles.box} display='flex' flexDirection='column'>
                <IconButton className={styles.button} onClick={toggleAddCategoryWindow}>
                    <CancelIcon/>
                </IconButton>
                <form className={styles.form}>
                    <Typography variant="h6" color="initial">{selectedCategory ? 'Edit' : 'Add'} category:</Typography>
                    <TextField label="Name" variant="outlined" name='name' className={styles.textfield} fullWidth onChange={handleChange} value={newCategory.name}/>
                    <TextField label="Description" variant="outlined" name='description' className={styles.textfield} fullWidth onChange={handleChange} value={newCategory.description}/>
                </form>
                <Button variant='contained' color='primary' fullWidth onClick={() => handlePostNewCategory(newCategory)}>{selectedCategory ? 'EDIT!' : 'ADD!'}</Button>
            </Box>
        </>
    )
}

export default AddCategory
