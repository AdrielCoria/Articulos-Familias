import React from 'react';
import { Link } from 'react-router-dom';

export const Inicio = () => {
    return (
        <div className='mt4 p-5 rounded' style={{ backgroundColor: "lightcoral" }}>
            <h1>Pymes 2024</h1>
            <p>Este ejemplo está desarollado con las siguientes tecnologías</p>
            <p>
                Backend: NodeJs, Express , WebApiRest, Swagger, Sequelize, Sqlite
                y
                múltiples capas en Javascript.
            </p>
            <p>
                Frontend: Single Page Aplication, HTML, CSS, Bootstrap, NodeJs,
                Javascript y React.
            </p>
            {/* <button className='btn btn-lg btn-primary'>
                <i className='fa fa-search'></i>
                Ver Articulos Famlias
            </button> */}
            <Link to='/articulosfamilias' className='btn btn-lg btn-primary'>
                <i className='fa fa-search'>Ver Articulos Familias</i>
            </Link>
        </div>
    )
}
export default {Inicio}