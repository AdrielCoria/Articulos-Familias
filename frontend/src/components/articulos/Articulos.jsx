// imports
import React, { useState, useEffect } from "react";
import moment from "moment"; // trabajar con fechas
import ArticulosBuscar from "./ArticulosBuscar";
import ArticulosListado from "./ArticulosListado";
import ArticulosRegistro from "./ArticulosRegistro";
//import { articulosfamiliasService } from "../../services/articulosFamilias-mock-service.js";
import { articulosService } from "../../services/articulos.service";
import { articulosfamiliasService } from "../../services/articulosFamilias.service";

export default function Articulos() {
    // acciones a realizar
    const TituloAccionABMC = {
        A: '(Agregar)',
        B: '(Eliminar)',
        M: '(Modificar)',
        C: '(Consultar)',
        L: '(Listado)',
    }

    // useState(valor inicial = L (Listado))
    const [AccionABMC, setAccionABMC] = useState("L");

    // useState(Nombre, Activo, Items, Item, Pagina, Paginas)
    const [Nombre, setNombre] = useState("");
    const [Activo, setActivo] = useState("");
    const [Items, setItems] = useState(null); // listado de articulos
    const [Item, setItem] = useState(null); // usado en BuscarPorId, (modificar , consultar)
    const [RegistrosTotal, setRegistrosTotal] = useState(0);
    const [Pagina, setPagina] = useState(1); // objeto página
    const [Paginas, setPaginas] = useState([]); // Listado de páginas
    const [ArticulosFamilias, setArticulosFamilias] = useState(null);

    // cargar al "montar" el componente, solo la primera vez (por la dependencia []) - Esto es del mock
    // useEffect(() => {
    //     async function BuscarArticulosFamilias() {
    //         let data = await articulosfamiliasService.Buscar();
    //         setArticulosFamilias(data);
    //     }
    //     BuscarArticulosFamilias();
    // }, []);

    // agregamos el service de articulosfamilias original
    useEffect(() => {
        async function BuscarArticulosFamilias() {
            let data = await articulosfamiliasService.Buscar();
            setArticulosFamilias(data);
        }
        BuscarArticulosFamilias();
    }, [])

    // función que nos permite realizar una búsqueda(datos hardcodeados)
    // async function Buscar() {
    //     alert("Buscando...");
    //     // hardcodeados 2 articulos para probar
    //     setItems(
    //         [

    //             {
    //                 IdArticulo: 108,
    //                 Nombre: "Adaptador usb wifi tl-wn722n",
    //                 Precio: 219.0,
    //                 CodigoDeBarra: "0693536405046",
    //                 IdArticuloFamilia: 9,
    //                 Stock: 898,
    //                 FechaAlta: "2017-01-23T00:00:00",
    //                 Activo: false,
    //             },
    //             {
    //                 IdArticulo: 139,
    //                 Nombre: "Aire acondicionado daewoo 3200fc dwt23200fc",
    //                 Precio: 5899.0,
    //                 CodigoDeBarra: "0779816944014",
    //                 IdArticuloFamilia: 7,
    //                 Stock: 668,
    //                 FechaAlta: "2017-01-04T00:00:00",
    //                 Activo: true,
    //             }
    //         ]
    //     );
    // }
    async function Buscar(_pagina) {
        if (_pagina && _pagina !== Pagina) {
            setPagina(_pagina);
        }
        else {
            _pagina = Pagina;
        }

        // consumimos el service de articulos
        const data = await articulosService.Buscar(Nombre, Activo, _pagina);
        setItems(data.Items);

        // generamos un array de las páginas para mostrar en select del paginador
        const arrayPaginas = [];
        for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
            arrayPaginas.push(i);
        }
        setPaginas(arrayPaginas);
    }

    // función que nos permite realizar un búsqueda por el campo id
    // async function BuscarPorId(item, accionABMC) {
    //     setAccionABMC(accionABMC);
    //     setItem(item);
    //     if (accionABMC === "C") {
    //         alert("Consultando...");
    //     }
    //     if (accionABMC === "M") {
    //         alert("Modificando...");
    //     }
    // }
    async function BuscarPorId(item, accionABMC) {
        const data = await articulosService.BuscarPorId(item);
        setItem(data);
        setAccionABMC(accionABMC);
    }

    // función que nos permite realizar una consulta por id, llamando a la función BuscarPorId()
    function Consultar(item) {
        BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
    }

    // función que nos permite realizar modificaciones por el campo id, llamamos a la función BuscarPorId
    function Modificar(item) {
        if (!item.Activo) {
            alert("No puede modificarse un registro Inactivo.");
            return;
        }
        BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
    }

    // función que nos permite agregar un item
    // function Agregar() {
    //     setAccionABMC("A");
    //     alert("preparando el Alta...");
    // }


    function Agregar() {
        setAccionABMC("A");
        setItem({
            IdArticulo: 0,
            Nombre: null,
            Precio: null,
            Stock: null,
            CodigoDeBarra: null,
            IdArticuloFamilia: null,
            FechaAlta: moment(new Date()).format("YYYY-MM-DD"),
            Activo: true,
        })
    }

    // función que nos permite realizar una impresión
    function Imprimir() {
        alert("En desarrollo ...");
    }

    // función que nos permite activar o desactivar un articulo de la lista
    // async function ActivarDesactivar(item) {
    //     const resp = window.confirm("¿Está seguro que quiere " + (item.Activo ? "desactivar" : "activar") + " el registro?");
    //     if (resp) {
    //         alert("Activado/Desactivado ...");
    //     }
    // }

    async function ActivarDesactivar(item) {
        const resp = window.confirm("Está seguro que quiere " + (item.Activo ? "desactivar" : "activar" + " el registro?"));
        if (resp) {
            await articulosService.ActivarDesactivar(item);
            await Buscar();
        }
    }

    // función que nos permite grabar un elemento al listado de articulos
    // async function Grabar(item) {
    //     alert("Registro " + (AccionABMC === "A" ? "agregado" : "modificado" + " correcto."));

    //     Volver();
    // }

    async function Grabar(item) {
        // agregar o modificar
        try {
            await articulosService.Grabar(item);
        }
        catch (error) {
            alert(error?.response?.data?.message ?? error.toString());
            return;
        }
        await Buscar();
        Volver();

        setTimeout(() => {
            alert("Registro " + (AccionABMC === "A" ? "agregado" : "modificado" + " correctamente."));
        }, 0);
    }

    // Volver/Cancelar desde Agregar/Modificar/Consultar (nos muestra el listado de articulos completo) por defecto
    function Volver() {
        setAccionABMC("L");
    }

    return (
        <div>
            <div className="tituloPagina">
                Articulos <small>{TituloAccionABMC[AccionABMC]}</small>
            </div>

            {
                AccionABMC === "L" &&
                <ArticulosBuscar
                    Nombre={Nombre}
                    setNombre={setNombre}
                    Activo={Activo}
                    setActivo={setActivo}
                    Buscar={Buscar}
                    Agregar={Agregar}
                />
            }

            {/* Tabla de resultado de búsqueda y Paginador */}
            {AccionABMC === "L" && Items?.length > 0 &&
                <ArticulosListado
                    {...{
                        Items,
                        Consultar,
                        Modificar,
                        ActivarDesactivar,
                        Imprimir,
                        Pagina,
                        RegistrosTotal,
                        Paginas,
                        Buscar
                    }}
                />}

            {AccionABMC === "L" && Items?.length === 0 &&
                <div className="alert alert-info mensajeAlert">
                    <i className="fa fa-exclamation-sign"></i>
                    No se ha encontrado registros ...
                </div>}

            {/* formulario de alta/modificar/constular */}
            {AccionABMC !== "L" &&
                <ArticulosRegistro
                    {...{
                        AccionABMC, ArticulosFamilias, Item, Grabar, Volver
                    }}
                />}
        </div>
    );
}
export { Articulos };