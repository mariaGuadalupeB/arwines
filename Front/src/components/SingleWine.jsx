import React from "react";
import imagenes from "../assets/media/imagenes"
import style from "../styles/SingleProducts.module.css"
import {useDispatch} from 'react-redux';
import {setWine} from '../store/wine'; 
import {Link} from 'react-router-dom'

export default function SingleWine({match}) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setWine(parseInt(match.params.id)))
      .then(() => console.log('GOT WINE'));
  }, [])

  return (
    <div className={style.barra}>
      {console.log(match)}
    <div className={style.unico} >
       <img src={imagenes[0].Imagen} />
       <h3>{imagenes[0].Marca}</h3>
      <h3>Año: {imagenes[0].Año}</h3>
      <h3>Variedad de la Uva: {imagenes[0].Uva}</h3>
      <h3>Precio: {imagenes[0].Precio}</h3>
      <div>
      <Link to="/"> Volver Atrás</Link>
      </div>
    </div>
    </div>
  );
}
