import React from "react";
import { Link } from "react-router-dom";
import imagenes from "../assets/media/imagenes"
import style from "../styles/Products.module.css";
import {useDispatch, useSelector} from 'react-redux';
import {setWines} from '../store/wines';

export default () => {
  const dispatch = useDispatch();
  const wines = useSelector(state => state.wines)

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
          {wines.wines && wines.wines.map((wine) => (
            <div key={wine.id}>
              <Link to={`/products/${wine.id}`} className={style.style}>
                <div>
                  <img src={wine.image_path} />
                  <div className={style.centrado}>
                    <div>
                      <p> {wine.name} </p>
                      <p>Precio: $ {wine.price} </p>
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

