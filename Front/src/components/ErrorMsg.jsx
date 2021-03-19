import React from "react";

import Style from '../styles/errorMsg.module.css'


const ErrorMsg = () => {

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

export default ErrorMsg;