import React, { useState } from "react";
import style from "../styles/SingleProducts.module.css"
import {useDispatch, useSelector} from 'react-redux';
import {setWine} from '../store/wine'; 
import {Link} from 'react-router-dom'
import {saveCartItems} from '../store/cart'
import { Button, Box }  from "@material-ui/core"
import { useHistory } from "react-router-dom";

export default function SingleWine({match}) {
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
        const updatedCart = prevCart.map(cart_item=> {
            if(cart_item.productId == selectedWine.id) {
                alreadyExisted = true
                cart_item.quantity += +quantity
            }    
            return cart_item
        })
        if(!alreadyExisted) updatedCart.push({
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
    <Box display="flex" justifyContent="center">
    <div className={style.unico} >
      <Link to="/"> Volver Atrás</Link>
       <img src={selectedWine.image_path} />
       <h3>{selectedWine.name}</h3>
      <h3>Descripcion: {selectedWine.description}</h3>
      <h3>Precio: $ {selectedWine.price}</h3>
      <div>
      {
        isLoggedIn ? 
        (
        <>
        <select name="quantity" onChange={(e) => setQuantity(e.target.value) }>
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
      <br />

      </div>
    </div>
    </Box>
  );
}
