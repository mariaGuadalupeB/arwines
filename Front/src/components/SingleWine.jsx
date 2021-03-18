
import React, { useState } from "react";
import style from "../styles/SingleProducts.module.css";
import { useDispatch, useSelector } from "react-redux";
import wineReducer, { setWine } from "../store/wine";
import { Link } from "react-router-dom";
import { saveCartItems } from "../store/cart";
import { Button, Box, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useStyles } from '../themes/themesConfig'
import ReviewsList from "./productsReviews/ReviewsList";
import Stars from "./productsReviews/Stars";

export default function SingleWine({ match }) {
  const dispatch = useDispatch();
  const selectedWine = useSelector((state) => state.selectedWine);
  const user = useSelector((state) => state.user);
  const isLoggedIn = Object.keys(user).length;
  const [quantity, setQuantity] = useState(0);
  const history = useHistory();
  const itmz = JSON.parse(localStorage.getItem("cart_items"));
  const [items, setItems] = useState(itmz);
  const [stock, setStock] = useState([]);

  React.useEffect(() => {
    dispatch(setWine(parseInt(match.params.id))).then((wine) => {
      const value = wine.payload.quantity > 6 ? 6 : wine.payload.quantity;

      setStock(Array.from({ length: value }, (_, i) => i + 1));
    });
  }, []);

  const AddProduct = () => {

    let alreadyExisted = false
    const updatedCart = items.map(cart_item => {
      if (cart_item.productId === selectedWine.id) {
        alreadyExisted = true
        cart_item.quantity += +quantity
      }
      return cart_item
    })

    if (!alreadyExisted) updatedCart.push({
      productId: selectedWine.id,
      quantity: +quantity
    })
    localStorage.setItem("cart_items", JSON.stringify(updatedCart))

    dispatch(saveCartItems(updatedCart))
    //   dispatch(saveCartItems({
    //   productId: selectedWine.id,
    //   quantity: +quantity
    // }))  
    history.push("/cart")
  }

  return (
    <div className='row'>
      <Grid container>
        <Grid item xs={6}>
          < div className={style.unico} >
            <img src={selectedWine.image_path} />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={style.rowDerecha}>
            <h1 className={style.tituloVino}>{selectedWine.name}</h1>
            {selectedWine.reviews && selectedWine.reviews.length ? <Stars number={Math.ceil(selectedWine.reviews.reduce((acc, ele) => acc += ele.rating , 0)/selectedWine.reviews.length)}/> : null }
            <div className={style.boxPrice}>
              <h3 className={style.precio}>Precio: $ {selectedWine.price}</h3>
            </div>

            <p className={style.description}>Descripcion: {selectedWine.description}</p>

            {
              isLoggedIn ?
                (
                  <>


                    <div className={style.quantity}>
                      <span className={style.cantidad}>
                        <FormControl className={useStyles.formControl}>
                          <Select name="quantity" onChange={(e) => setQuantity(e.target.value)} className={style.cantidad} >

                            {stock && stock.map((n) => {
                              return <MenuItem key={n} value={n}>{n} {n > 1 ? 'unidades' : 'unidad'}</MenuItem>
                            })
                            }
                          </Select>
                        </FormControl>
                        <p>{!quantity ? '' : '(' + selectedWine.quantity + ' disponibles)'}  </p>
                      </span>

                      <div className={style.botonCarro}>
                        {
                          quantity ?

                            <Button variant="contained" color="primary" onClick={AddProduct} style={{ backgroundColor: 'rgb(90,57,139)', color: 'white' }} >Añadir al carrito</Button>
                            :

                            <Button variant="contained" color='primary' onClick={AddProduct} disabled >Añadir al carrito</Button>

                        }
                      </div>

                    </div>
                  </>
                )
                :
                null
            }

          </div>
        </Grid>
      </Grid>
      <hr />
      {selectedWine.reviews && selectedWine.reviews.length ? <ReviewsList reviews={selectedWine.reviews}/> : null }
      
    </div >


  );
}