import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {saveCartItems, fetchCartItemsData} from "../store/cart"
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import style from "../styles/Products.module.css";


// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

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
  const cart_items = useSelector((state) => state.cart_items);
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(fetchCartItemsData(cart_items))  

    return function() { return 1}

  }, [dispatch]);
 
  
  return (
    <div>
        <h1>CARRITO</h1><br />
        <p>
          Productos del carrito:
        </p>
      {
        cart_items.length && cart_items.map((wine, i)=>
        (
          <div key={i}>
            {console.log(cart_items, 'WINE')}
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
        cart_items.length && cart_items.reduce((i, wine) => i+= wine.price * wine.quantity
        ,0)
        }

      </h4><br />
      
    </div>
  );
};

export default Cart;
