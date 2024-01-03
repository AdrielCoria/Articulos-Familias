// imports
import axios from "axios";
import {config} from "../config";
import httpService from "./http.service";

//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulosfamilias";

const urlResource = config.urlResourceArticulosFamilias;

// nos permite obtener articulosfamilias
async function Buscar() {
    const resp = await axios.get(urlResource);
    return resp.data;
}

// exportamos
export const articulosfamiliasService = {
    Buscar
};