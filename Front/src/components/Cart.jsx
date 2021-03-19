import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

//STORE
import { saveCartItems } from "../store/cart";
import { resetCart_items } from "../store/cart";

//MATERIAL UI
import style from "../styles/Products.module.css";
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
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
  grid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    padding: theme.spacing(4),
    textAlign: "left",
    borderColor: "none",
  },
  button: { margin: theme.spacing(1) },
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
    textAlign: 'left',
    borderColor: "none",
  },
}));

const Cart = () => {
  const dispatch = useDispatch();
  const cart_items = useSelector((state) => state.cart_items);
  const { token } = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const classes = useStyles();
  const history = useHistory()

  React.useEffect(() => {
    console.log(cart_items, "CART ITEMS EN STORE DESDE CART");
    const promisesProducts = cart_items.map((cartItem) => {
      const id = cartItem.productId;
      return axios
        .get(`http://localhost:5000/api/product/${id}`)
        .then(({ data }) => {
          data.quantity = cartItem.quantity;
          return data;
        });
    });
    Promise.all(promisesProducts).then((cartItems) => setItems(cartItems));
  }, []);
 
  const total = items.reduce((i, wine) => (i += wine.price * wine.quantity), 0);

  const historyCart = () => {
    history.push("/historycart")
  }
  
  const checkOutCart = () => {
    return axios
      .post("http://localhost:5000/api/cart/", { cart_items, total }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => dispatch(resetCart_items()))
      .then(() => dispatch(resetCart_items()))
      .then(() => localStorage.setItem('cart_items', JSON.stringify([])))
      .then(() => history.push("/checkoutcart"))
  }

  const functionAddSub = (arr) => {
    const promisesProducts = arr.map((cartItem) => {
      const id = cartItem.productId;
      return axios
        .get(`http://localhost:5000/api/product/${id}`)
        .then(({ data }) => {
          data.quantity = cartItem.quantity;
          return data;
        });
    });
    Promise.all(promisesProducts)
      .then((cartItems) => {
        localStorage.setItem('cart_items', JSON.stringify(arr))
        dispatch(saveCartItems(arr))
        return (setItems(cartItems))
      });
  }

  const subQuantityHandler = (wine) => {
    let arr = JSON.parse(localStorage.getItem("cart_items"))
    arr.map((item) => {
      if (item.productId === wine.id) item.quantity = wine.quantity - 1
    })

    functionAddSub(arr)
  }

  const addQuantityHandler = (wine) => {
    let arr = JSON.parse(localStorage.getItem("cart_items"))
    arr.map((item) => {
      if (item.productId === wine.id) item.quantity = wine.quantity + 1
    })

    functionAddSub(arr)
  }

  const deleteProduct = (idWine) => {
    let arr = JSON.parse(localStorage.getItem("cart_items"))
    for (let element of arr) {
      if (element.productId == idWine) {
        arr.splice(arr.indexOf(element), 1)

        functionAddSub(arr)
      }
    }
  }

  return (
    <div>
      <div className={classes.headerCart}>
        <div style={{ width: "100%" }}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography variant="h4" component="h4">
                {" "}
                    Shop Cart
                  </Typography>
            </Box>
            <Box p={1}>
              <Button
                variant="outlined"
                color="primary"
                onClick={historyCart}
              >
                Ver historial de compra
                  </Button>
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
                    Tus productos
                  </Typography>
            </Box>
            <Box p={1}>
              <Typography variant="h5" component="h5">
                {" "}
                    Total: ${items.length && total}
              </Typography>
            </Box>
          </Box>
        </div>
      </div>

      <Grid className={classes.grid}>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Producto:</TableCell>
                {<TableCell align="right"></TableCell>}
                <TableCell align="center">Precio:</TableCell>
                <TableCell align="center">Cantidad:</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {items.length &&
                items.map((wine, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">
                      <Link
                        to={`/products/${wine.id}`}
                        className={style.style}
                      >
                        <img
                          className={classes.img}
                          src={wine.image_path}
                        />
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {wine.name}
                    </TableCell>
                    <TableCell align="center">${wine.price}</TableCell>
                    <TableCell align="center">
                      <RemoveIcon onClick={() => subQuantityHandler(wine)}></RemoveIcon>
                      <Typography variant="h5" component="span">
                        {wine.quantity}
                      </Typography>
                      <AddIcon onClick={() => addQuantityHandler(wine)}></AddIcon>
                    </TableCell>

                    <TableCell align="center">
                      <DeleteIcon
                        onClick={() => deleteProduct(wine.id)}
                      ></DeleteIcon>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>

          </Table>
        </TableContainer>
      </Grid>

      <div className={classes.headerCart}>
        <div style={{ width: "100%" }}>
          <Box display="flex">
            <Box flexGrow={1}></Box>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={checkOutCart}
              >
                Confirmar compra
                  </Button>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Cart;
