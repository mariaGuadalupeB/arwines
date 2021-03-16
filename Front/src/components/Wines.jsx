import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { setWines, queryWines } from '../store/wines';
import style from "../styles/Products.module.css";
import ErrorMsg from "./ErrorMsg";


export default ({ search }) => {
  const dispatch = useDispatch();
  const wines = useSelector(state => state.wines)

  const request = () => {
    if (search) return  dispatch(queryWines(search.params.query)) 
    return  dispatch(setWines())
  }

  React.useEffect(() => {
    request()
  }, [search]);
  
  return (
    <div>

      <div className={style.centrado}>
        <div className={style.wrapper}>

        {
          wines.wines && !wines.wines.length?
            <ErrorMsg/>
          :
            (
            wines.wines && wines.wines.map((wine) => (
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
            ))
            )
        }       
          
        </div>
      </div>
    </div>
  );
};

