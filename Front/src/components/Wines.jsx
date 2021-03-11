import React from "react";
import { Link } from "react-router-dom";
import imagenes from "../assets/media/imagenes";
import style from "../styles/Products.module.css";
import {useDispatch} from 'react-redux';
import {setWines} from '../store/wines';

export default () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setWines())
      .then(() => console.log('GOT WINES'))    
  }, [])

  return (
    <div>
      <div className={style.titulo}>
        <h1>VINOS</h1>
      </div>
      <div className={style.centrado}>
        <div className={style.wrapper}>
          {imagenes.map((imagen) => (
            <div key={imagen.id}>
              <Link to={`/products/${imagen.id}`} className={style.style}>
                <div key={imagen.id} className="col-xs-4">
                  <img src={imagen.Imagen} />
                  <div className={style.centrado}>
                    <div>
                      <p> {imagen.Marca} </p>
                      <p>Año: {imagen.Año} </p>
                      <p>Precio: {imagen.Precio} </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

