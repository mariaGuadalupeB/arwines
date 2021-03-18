import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveCartItems, fetchCartItemsData } from "../store/cart";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "../styles/Products.module.css";
import { makeStyles } from "@material-ui/core/styles";
import { resetCart_items } from "../store/cart";
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
import DeleteIcon from "@material-ui/icons/Delete";

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
  const dispatch = useDispatch();
  const cart_items = useSelector((state) => state.cart_items);
  const { token } = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const classes = useStyles();

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/api/cart/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        console.log(data);
        setItems(data);
      });
  }, []);

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
                <TableCell align="center">Subtotal</TableCell>
                <TableCell align="center">Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length &&
                items.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">{item.status === "rejected" ? "-" : item["cart_items.cartId"]}</TableCell>
                    <TableCell align="center">{item.status === "rejected" ? "-" : item["cart_items.product.name"]}</TableCell>
                    <TableCell align="center">{item.status === "rejected" ? "-" : "$" + item.total}</TableCell>
                    <TableCell align="center">{item.status === "confirmed" ? <Link to="/review">{item.status}</Link> : item.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
};

export default HistoryCart;
