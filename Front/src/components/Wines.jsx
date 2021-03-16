import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/Products.module.css";
import {setWines} from '../store/wines';
import {useSelector} from 'react-redux';

export default () => {
  const wines = useSelector(state => state.wines)

  return (
    <div>
      <div className={style.titulo}>
        <h1>ARWines</h1>
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

