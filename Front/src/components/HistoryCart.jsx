import React, { useState } from "react";
import { useSelector } from "react-redux";


import Button from "@material-ui/core/Button";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import AddReview from './productsReviews/AddReview';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    padding: theme.spacing(4),
    textAlign: "left",
    borderColor: "none",
  },
  button: {
    margin: theme.spacing(1),
  },
  logIn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  headerCart: {
    display: "flex",
    margin: theme.spacing(4),
  },
  img: {
    height: "100px",
    width: "75px",
  },
  history: {
    marginTop: "50px",
    marginBottom: "50px",
    width: "90%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    borderColor: "none",
  },
}));

const HistoryCart = () => {
  
  
  const { token } = useSelector((state) => state.user);
  const [openAddReview, setOpenAddReview] = React.useState(false);
  const [items, setItems] = useState([]);
  const [selectedProduct, setSelectedProduct ] = React.useState({});
  const classes = useStyles();
  const [userReviewsByProducts, setUserReviewsByProducts] = React.useState([]);
  const [triggerUpdateList, setTriggerUpdateList] = React.useState(false);

  const handleTriggerUpdateList = () => {
    setTriggerUpdateList(triggerUpdateList => !triggerUpdateList);
  }

  const handleOpenAddReview = product => {
    setSelectedProduct(product);
    setOpenAddReview(openAddReview => !openAddReview);
  }

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/api/cart/history", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        setItems(data);
      });
  }, []);

  React.useEffect(() => {
    axios.get(`http://localhost:5000/api/review`, { headers: { Authorization: `Bearer ${token}` } })
    .then(r => r.data)
    .then(reviews => {
      setUserReviewsByProducts(reviews);
    })
  }, [triggerUpdateList])

  return (
    <div>
      <div className={classes.headerCart}>
        <div style={{ width: "100%" }}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography variant="h4" component="h4">
                {" "}
                Historial de compras
              </Typography>
            </Box>
          </Box>
        </div>
      </div>

      <div className={classes.headerCart}>
        <div style={{ width: "100%" }}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography variant="h5" component="h5">
                {" "}
                Tus carritos
              </Typography>
            </Box>
          </Box>
        </div>
      </div>
      <Grid className={classes.grid}>
        {openAddReview ? 
          <AddReview 
            handleOpenAddReview={handleOpenAddReview}
            selectedProduct={selectedProduct}
            handleTriggerUpdateList={handleTriggerUpdateList}
          /> : ''}
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Carrito</TableCell>
                <TableCell align="center">Producto/s</TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length &&
                items.map((item, i) => (
                    item["cart_items.product.id"] ? (
                      <TableRow key={i}>
                        <TableCell align="center">{item["cart_items.cartId"]}</TableCell>
                        <TableCell align="center">{item["cart_items.product.name"]}</TableCell>
                        <TableCell align="center">${item.total}</TableCell>
                        <TableCell align="center">{item.status}</TableCell>
                        {userReviewsByProducts.includes(item["cart_items.product.id"]) ? 
                          <TableCell align="center">Ya agregaste una review</TableCell>
                          :
                          <TableCell align="center">{item.status === "confirmed" ? <Button variant='contained' color='primary' onClick={() => handleOpenAddReview(item)}>ADD REVIEW</Button> : '' }</TableCell>
                        }
                      </TableRow>
                    ) : ''
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
};

export default HistoryCart;
