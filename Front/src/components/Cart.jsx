import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import setCart from "../store/cart"
import { findProducts } from "../store/cart"
import Navbar from './Navbar'

// MATERIAL UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

// evalue si el user existe, si no en el use Efect de component did mount un history push a loggin
// si existe lo dejamos pasar

// Descripción

// - Acceder a una ruta que me mustre los productos que tengo agregados al carrito. ✓
// - Ver un total a pagar por la suma de TODOS los productos agregados al carrito
// - Pagar mi carrito (en caso de estar logueado, sino que me redirija al login).

// To do

// - Ver productos agregados al carrito y la cantidad de cada uno
// - Poder eliminar un producto desde el carrito
// - Poder aumentar o disminuir la cantidad de elementos en un mismo producto
// - Ver total a pagar
// - Llevarme a la vista de checkout para realziar el pago
// - En caso de estar deslogueado, redirigirme al login  ✓

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
}));


const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [price, setPrice] = React.useState("")


  const localStorage = JSON.parse(localStorage.get("userCart"))

  React.useEffect(() => {
    if (!user) {
      history.push("/login"); // si no existe usuario logeado redirecciona al login
    }
    // localStorage.cart_item.map((obj)=>{
    //   obj.productId
    // })
  }, []);

  React.useEffect(() => {
    // cada vez que se modifique cart (eliminan o agregan productos) se actualiza el precio total y cantidad de productos
    

  }, [cart]);

  const totalPrice = () => {
    // aca sumaria el precio de los items que hay en el carrito
  };

  const deleteProduct = () => {
    // logica para eliminar un producto del carrito
  };

  const deleteAllProducts = () => {

  }

  const addProduct = () => {

  }

  return (
    <div>
      <Navbar />
        <h1>CARRITO</h1><br />
        <p>
          Productos del carrito:
        </p>
      {cart && cart.map((item)=>{
        <div> {item.id}{/* item.cantidad */}</div>
      })}
      
      <h4>PRECIO TOTAL</h4><br />
      <button onClick={addProduct}>+1 PRODUCTO</button><br />
      <button onClick={deleteProduct}>-1 PRODUCTO</button><br />
      <button onClick={deleteAllProducts}>ELIMINAR</button><br />
      <button>COMPRAR</button><br />
      
    </div>
  );
};

export default Cart;

