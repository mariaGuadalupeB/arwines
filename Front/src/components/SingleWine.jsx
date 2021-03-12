import React from "react";
import imagenes from "../assets/media/imagenes"
import style from "../styles/SingleProducts.module.css"
import {useDispatch, useSelector} from 'react-redux';
import {setWine} from '../store/wine'; 
import {Link} from 'react-router-dom'

export default function SingleWine({match}) {
  const dispatch = useDispatch();
  const selectedWine = useSelector(state => state.selectedWine)

  React.useEffect(() => {
    dispatch(setWine(parseInt(match.params.id)))
      .then(() => console.log('GOT WINE'));
  }, [])

  return (
    <div className={style.barra}>
      {console.log(match)}
    <div className={style.unico} >
       <img src={selectedWine.image_path} />
       <h3>{selectedWine.name}</h3>
      <h3>Descripcion: {selectedWine.description}</h3>
      <h3>Precio: $ {selectedWine.price}</h3>
      <div>
      <Link to="/"> Volver Atrás</Link>
      </div>
    </div>
    </div>
  );
}
