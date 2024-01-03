import { config } from "../config";
import httpService from "./http.service.js";

const urlResource = config.urlResourceArticulos;

async function Buscar(Nombre, Activo, Pagina) {
    const resp = await httpService.get(urlResource, {
        params: { Nombre, Activo, Pagina },
    });
    return resp.data;
}

async function BuscarPorId(item) {
    const resp = await httpService.get(urlResource + "/" + item.IdArticulo);
    return resp.data;
}

async function ActivarDesactivar(item) {
    await httpService.delete(urlResource + "/" + item.IdArticulo);
}

async function Grabar(item) {
    if (item.IdArticulo === 0) {
        await httpService.post(urlResource, item);
    } else {
        await httpService.put(urlResource + "/" + item.IdArticulo, item);
    }
}

export const articulosService = {
    Buscar,
    BuscarPorId,
    ActivarDesactivar,
    Grabar
};

































// // imports
// import axios from "axios";

// const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// // realizamos la búsqueda de un articulo
// async function Buscar(Nombre, Activo, Pagina) {
//     const resp = await axios.get(urlResource, {
//         params: { Nombre, Activo, Pagina }
//     });
//     return resp.data;
// }

// // realizamos la búsqueda por query-params
// async function BuscarPorId(item) {
//     const resp = await axios.get(urlResource + "/", item.IdArticulo);
//     return resp.data;
// }

// // nos permite deshabilitar/ habilitar una articulo
// async function ActivarDesactivar(item) {
//     await axios.delete(urlResource + "/" + item.IdArticulo);
// }

// // nos permite agragar un articulo o modificar si ya existe el mismo
// async function Grabar(item) {
//     if (item.IdArticulo === 0) {
//         await axios.post(urlResource, item);
//     }
//     else {
//         await axios.put(urlResource + "/" + item.IdArticulo, item);
//     }
// }

// // exportamos
// export const articulosService ={
//     Buscar, BuscarPorId, ActivarDesactivar, Grabar
// }