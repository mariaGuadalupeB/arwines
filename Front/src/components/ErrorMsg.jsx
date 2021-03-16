import React from "react";
import { Link } from "react-router-dom";

export default () => {
  
  return(
        <div>
            <h1>
                No hay resultados que coincidan con tu búsqueda.
            </h1>
              
            <ul>
                <li>
                    Revisá la ortografía de la palabra.
                </li>
                <li>
                    Utilizá palabras más genéricas o menos palabras.
                </li>
                <li>
                    Navegá por las categorías para encontrar un producto similar
                </li>
            </ul>

            <Link to="/"> Inicio </Link>
        </div>
  );
};

