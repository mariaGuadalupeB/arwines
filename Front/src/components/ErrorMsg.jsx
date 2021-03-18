import React from "react";
import { Link } from "react-router-dom";
import Style from '../styles/errorMsg.module.css'
import { Button } from "@material-ui/core"

export default () => {

    return (
        <div>
            <div className={Style.backgroundColor}>
                <div className={Style.background} >
                    <h1>
                        No hay resultados que coincidan con tu búsqueda
                 </h1>

                    <div className={Style.Li}>
                        <ul>
                            <span className={Style.liUno}>
                                <li >
                                    Revisá la ortografía de la palabra.
                             </li>

                            </span>
                            <span className={Style.liDos}>

                                <li>
                                    Utilizá palabras más genéricas o menos palabras.
                </li>
                            </span>
                            <li>
                                Navegá por las categorías para encontrar un producto similar
                </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
};

