import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {saveCartItems, fetchCartItemsData} from "../store/cart"
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom";
import axios from 'axios'
import style from "../styles/Products.module.css";
import { makeStyles } from "@material-ui/core/styles";
import { resetCart_items } from '../store/cart';

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
  const dispatch = useDispatch()
  const cart_items = useSelector((state) => state.cart_items);
  const {token} = useSelector((state) => state.user);
  const [items, setItems] = useState([])



  const checkOutCart = () => {
    return axios
      .post("http://localhost:5000/api/cart/", {cart_items, total}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(()=>dispatch(resetCart_items()))
      .then(()=>localStorage.setItem('cart_items', JSON.stringify([])) )
  }

React.useEffect(() => {
    const promisesProducts = cart_items.map((cartItem) => {
      const id = cartItem.productId
      return axios.get(`http://localhost:5000/api/product/${id}`)
      .then(({ data }) => {
        data.quantity = cartItem.quantity
        return data
      })
    })
    Promise.all(promisesProducts).then(cartItems => setItems(cartItems))
  },[])
 
const total = items.reduce((i, wine) => i+= wine.price * wine.quantity
,0)



  return (
    <div>
        <h1>CARRITO</h1><br />
        <p>
          Productos del carrito:
        </p>
      {
        items.length && items.map((wine, i)=>
        (
          <div key={i}>
              <Link to={`/products/${wine.id}`} className={style.style}>
                <div>
                  <img src={wine.image_path} />
                  <div className={style.centrado}>
                    <div>
                      <p> {wine.name} </p>
                      <p>Precio: $ {wine.price} </p>
                      <p>Cantidad pedida: {wine.quantity} </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
        ))
      }
      
      <h4>SUBTOTAL: 
        {
        items.length && total
        }

      </h4><br />
      <Button variant="contained" color="primary" onClick={checkOutCart}>Confirmar compra</Button>

      
    </div>
  );
};

export default Cart;
