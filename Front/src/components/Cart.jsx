import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const cart = useSelector((state) => state.cart);
  const [productsArr, setProductsArr] = React.useState([])

  
  React.useEffect(() => {
    setProductsArr([])
    const PromisesProducts = cart.map((cartItem) => {
      const id = cartItem.productId
      return axios.get(`http://localhost:5000/api/product/${id}`)
      .then(({ data }) => {
        data.quantity = cartItem.quantity
        return data
      })
    })

    Promise.all(PromisesProducts)
    .then(cartItems => {
      setProductsArr(cartItems)
    })
  }, []);
  
  return (
    <div>
        <h1>CARRITO</h1><br />
        <p>
          Productos del carrito:
        </p>
      {
        productsArr.length && productsArr.map((wine, i)=>
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
        productsArr.length && productsArr.reduce((i, wine) => i+= wine.price * wine.quantity
        ,0)
        }

      </h4><br />
      
    </div>
  );
};

export default Cart;
