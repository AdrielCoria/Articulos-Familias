import arrayArticuloFamilia from "../datos-mock/articulosfamilias-mock";

// mostrar todos los elementos
async function Buscar() {
    return arrayArticuloFamilia;
}

// mostrar un elemento de la lista por id
async function BuscarPorId(IdArticuloFamilia) {
    return arrayArticuloFamilia.find((articuloFamlia) => articuloFamlia.IdArticuloFamilia === IdArticuloFamilia);
}

// agregar un elemento a la lista
async function Agregar(articuloFamlia) {
    // simulamos el incremento: Identity(1,1) de una base de datos
    articuloFamlia.IdArticuloFamilia = arrayArticuloFamilia.length + 1;

    // agregaoms articuloFamlia al arreglo arrayArticuloFamilia
    arrayArticuloFamilia.push(articuloFamlia);
}

// modificamos un elemento de la lista
async function Modificar(articuloFamilia) {
    let articuloFamiliaEncontrado = arrayArticuloFamilia.find((articuloFamiliaFind) => articuloFamiliaFind.IdArticuloFamilia === articuloFamilia.IdArticuloFamilia);

    if (articuloFamiliaEncontrado) {
        articuloFamiliaEncontrado.Nombre = articuloFamilia.Nombre;
    }
}

// eliminamos un elemento de la lista
async function Eliminar(IdArticuloFamilia) {
    let articuloFamiliaEncontrado = arrayArticuloFamilia.find((articuloFamiliaFind) =>
        articuloFamiliaFind.IdArticuloFamilia === IdArticuloFamilia);

    if (articuloFamiliaEncontrado) {
        arrayArticuloFamilia.splice(arrayArticuloFamilia.indexOf(articuloFamiliaEncontrado), 1)
    }
}

export const articuloFamiliasMockService ={
    Buscar, BuscarPorId, Agregar, Modificar, Eliminar
}