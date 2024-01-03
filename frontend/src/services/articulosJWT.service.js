// imports
import { config } from "../config";
import httpService from "./http.service";
const urlServidor = "https://labsys.frc.utn.edu.ar/dds-express"
const urlResourceArticulos = urlServidor + "/api/articulos";

const urlResource = urlResourceArticulos;

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
export const articulosJWTService = {
    Buscar, BuscarPorId, ActivarDesactivar, Grabar
}