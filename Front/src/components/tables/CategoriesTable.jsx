import { Table, TableContainer, TableHead, TableRow, withStyles, makeStyles, TableCell, Paper, TableBody, Button } from '@material-ui/core';
import React from 'react';
import axios from 'axios';
import AddCategory from '../AddCategory';

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

const CategoriesTable = () => {
    const classes = useStyles();
    const [categories, setCategories] = React.useState([]);
    const [openAddCategory, setOpenAddCategory] = React.useState(false);
    const [openEditCategory, setOpenEditCategory] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState({});

    React.useEffect(() => {
      axios.get('http://localhost:5000/api/category')
        .then(r => r.data)
        .then(categories => setCategories(categories));
    }, []);

    const toggleAddCategoryWindow = () => {
      setOpenAddCategory(!openAddCategory);
    };

    const toggleEditCategoryWindow = category => {
      setSelectedCategory(category);
      setOpenEditCategory(!openEditCategory);
    }

    const handleDelete = id => {
      axios.delete(`http://localhost:5000/api/category/${id}`)
        .then(r => r.data)
        .then(() => {
          setCategories(categories => categories.filter(category => category.id !== id));
        })
    } 

    return (
      <TableContainer className={classes.container}>
        {categories && categories.length ?
        (
          <div>
            {openAddCategory ? <AddCategory toggleAddCategoryWindow={toggleAddCategoryWindow} categories={categories} setCategories={setCategories}/> : ''}
            {openEditCategory ? <AddCategory toggleAddCategoryWindow={toggleEditCategoryWindow} categories={categories} setCategories={setCategories} selectedCategory={selectedCategory}/> : ''}
            <Button variant='contained' color='primary' fullWidth className={classes.button} onClick={toggleAddCategoryWindow}>Add category</Button>
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
                {categories.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell align="right">{row.id}</StyledTableCell>
                    <StyledTableCell align="right">{row.name}</StyledTableCell>
                    <StyledTableCell align="left">{row.description}</StyledTableCell>
                    <StyledTableCell align="left">
                        <Button variant='contained' color='secondary' style={{marginRight: '1em'}} onClick={() => handleDelete(row.id)}>
                            DELETE
                        </Button>
                        <Button variant='contained' color='primary' onClick={() => toggleEditCategoryWindow(row)}>
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

export default CategoriesTable
