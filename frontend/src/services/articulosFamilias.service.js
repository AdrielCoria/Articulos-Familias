// imports
import axios from "axios";

const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulosfamilias";

// nos permite obtener articulosfamilias
async function Buscar() {
    const resp = await axios.get(urlResource);
    return resp.data;
}

// exportamos
export const articulosfamiliasService = {
    Buscar
};