// imports
import express from 'express';

// varibles
const router = express.Router();

// array completo de todos los articulos familias hardcodeados
let arrayArticuloFamlia = [
    {
        "IdArticuloFamilia": 1,
        "Nombre": "Accesorios"
    },
    {
        "IdArticuloFamilia": 2,
        "Nombre": "Audio"
    },
    {
        "IdArticuloFamilia": 3,
        "Nombre": "Celulares"
    },
    {
        "IdArticuloFamilia": 4,
        "Nombre": "Cuidado Personal"
    },
    {
        "IdArticuloFamilia": 5,
        "Nombre": "Dvd"
    },
    {
        "IdArticuloFamilia": 6,
        "Nombre": "Fotografia"
    },
    {
        "IdArticuloFamilia": 7,
        "Nombre": "Frio-Calor"
    },
    {
        "IdArticuloFamilia": 8,
        "Nombre": "Gps"
    },
    {
        "IdArticuloFamilia": 9,
        "Nombre": "Informatica"
    },
    {
        "IdArticuloFamilia": 10,
        "Nombre": "Led - Lcd"
    }
]

// definimos la ruta donde vamoa a tener nuestro array, para su posterior consumo

// endpoint: Get
router.get('/', async function (req, res) {
    // devolvemos este array en formato json (serializado)
    res.json(arrayArticuloFamlia);
})

// endpoint: Get/id
router.get('/:id', async function (req, res) {
    let articuloFamilia = arrayArticuloFamlia.find(
        (x) => x.IdArticuloFamilia == req.params.id
    );

    if (articuloFamilia)
        res.json(articuloFamilia);
    else
        res.status(404).json({ message: 'articulofamilia no encontrado' });
});

// endpoint: Get(mejorado)
router.get('/filtrado', async function (req, res) {

    // leemos por parámetro opcional "nombre" desde la query string
    const nombreParam = req.query.Nombre;

    console.log('Valor del parámetro: ', nombreParam);

    // filtramos el array si se llega a proporcionar el parámetro 'nombre'
    let articuloFamiliaFiltrado = arrayArticuloFamlia;

    if (nombreParam) {
        articuloFamiliaFiltrado = arrayArticuloFamlia.filter(
            (x) => x.Nombre.toLowerCase() === nombreParam.toLocaleLowerCase()
        );
    }

    console.log("ArticuloFamiliaFiltrado: ", articuloFamiliaFiltrado)
    // devolvemos el resultado en formato json
    res.json(articuloFamiliaFiltrado);
})

// endpoint: Post
router.post('/', (req, res) => {

    const { Nombre } = req.body;

    let articuloFamilia = {
        Nombre,
        IdArticuloFamilia: Math.floor(Math.random() * 100000)
    };

    // aqui agregamos el objeto al arreglo
    arrayArticuloFamlia.push(articuloFamilia);

    // enviamos la resputa con el objeto agregado
    res.status(201).json(articuloFamilia);
})

// endpoint: Put
router.put('/:id', (req, res) => {
    let articuloFamilia = arrayArticuloFamlia.find(
        (x) => x.IdArticuloFamilia == req.params.id
    )

    if (articuloFamilia) {
        const { Nombre } = req.body;
        articuloFamilia.Nombre = Nombre;
        res.json({ message: 'articulofamilia actualizado con éxito' });
    }
    else {
        res.status(404).json({ message: 'articulofamilia no encontrado' });
    }
});

// endpoint: Delete
router.delete('/:id', (req, res) => {
    let articuloFamilia = arrayArticuloFamlia.find(
        (x) => x.IdArticuloFamilia == req.params.id
    );

    if (articuloFamilia) {
        arrayArticuloFamlia = arrayArticuloFamlia.filter(
            (x) => x.IdArticuloFamilia != req.params.id
        );
        res.json({ message: 'articulofamilia eliminado con éxito' });
    }
    else {
        res.status(404).json({ message: 'articulofamilia no encontrado' });
    }
})


// exportamos la api
export default router;