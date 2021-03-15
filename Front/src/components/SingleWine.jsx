import React, { useState } from "react";
import style from "../styles/SingleProducts.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { setWine } from '../store/wine';
import { Link } from 'react-router-dom'
import { saveCartItems } from '../store/cart'
import { Button, Box, Grid } from "@material-ui/core"
import { useHistory } from "react-router-dom";

export default function SingleWine({ match }) {
  const dispatch = useDispatch();
  const selectedWine = useSelector(state => state.selectedWine)
  const user = useSelector((state) => state.user)
  const isLoggedIn = Object.keys(user).length
  const [quantity, setQuantity] = useState(0)
  const history = useHistory();

  React.useEffect(() => {
    dispatch(setWine(parseInt(match.params.id)))
      .then(() => console.log('GOT WINE'));
  }, [])

  const AddProduct = () => {
    const prevCart = JSON.parse(localStorage.getItem("cart_items"))
    let alreadyExisted = false
    const updatedCart = prevCart.map(cart_item => {
      if (cart_item.productId == selectedWine.id) {
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

    dispatch(saveCartItems({
      productId: selectedWine.id,
      quantity: +quantity
    }))
    history.push("/cart")
  }



  return (
    <div className='row'>
      <Grid container>
        <Grid xs={6}>
          < div className={style.unico} >
            <img src={selectedWine.image_path} />
          </div>
        </Grid>
        <Grid xs={6}>
          <div className={style.rowDerecha}>
            <h1 className={style.tituloVino}>{selectedWine.name}</h1>
            <div className={style.boxPrice}>
              <h3 className={style.precio}>Precio: $ {selectedWine.price}</h3>
            </div>
            <p className={style.description}>Descripcion: {selectedWine.description}</p>
            <Link to="/"><Button variant="contained" color='primary' className={style.botonAtras}>Añadir al carrito</Button></Link>
          </div>
        </Grid>
      </Grid>
      <hr />

      <div>
        {
          isLoggedIn ?
            (
              <>
                <select name="quantity" onChange={(e) => setQuantity(e.target.value)}>
                  <option value="">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                {
                  quantity ?
                    <Button variant="contained" color="primary" onClick={AddProduct} >AGREGAR</Button>
                    :
                    <Button variant="contained" color="primary" onClick={AddProduct} disabled >AGREGAR</Button>
                }
              </>
            )
            :
            null
        }


      </div>
    </div >


  );
}
