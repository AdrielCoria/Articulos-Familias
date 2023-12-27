// imports
//import arrayArticuloFamilia from "../datos-mock/articulosfamilias-mock";
import React, {useState, useEffect} from 'react';
import { articuloFamiliasMockService } from '../services/articulosFamilias-mock-service';


// constantes
// const articulosFamilias = arrayArticuloFamilia;


function ArticulosFamilias() {
    const tituloPagina = 'Articulos Familias';
    
    // Sintaxis del useState
    // const [arreglo, setArreglo] = useState(valorInicial);
    const [articulosFamilias, setArticulosFamilias] = useState(null);

    // cargamos al montar el componente (solo una vez)
    // Sintaxis del useEffect
    // useEffect(() => {}, []);
    useEffect(() => {
        BuscarArticulosFamilias();
    }, []);

    // Funcion que nos va a ver permitir modificar el arreglo de articulosfamilias
    async function BuscarArticulosFamilias(){
        let data = await articuloFamiliasMockService.Buscar();
        setArticulosFamilias(data);
    }
    
    return (
        <>
            <div className="tituloPagina">{tituloPagina}</div>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th style={{ width: "40%" }}>IdArticuloFamilia</th>
                            <th style={{ width: "60%" }}>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 
                        <tr> // Fila
                            <td>1</td> // Columna
                            <td>Accesorios</td>
                        </tr> 
                        array.map(item => {}) // Indicamos que no retornamos nada.
                        array.map(item => ()) // Indicamos que retornamos algo.
                        */}
                        {/* Si existe el array articuloFamilia */}
                        {articulosFamilias && articulosFamilias.map((articuloFamilia) => (
                            <tr key={articuloFamilia.IdArticuloFamilia}>
                            <td>{articuloFamilia.IdArticuloFamilia}</td>
                            <td>{articuloFamilia.Nombre}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export {ArticulosFamilias};