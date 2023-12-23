// imports
import express from "express";
import articulofamiliamockRouter from "./routes/articulosfamiliasmock.js";
import articuloFamiliaRouter from './routes/articulosfamilias.js'

// crea la base de datos si no existe
// import './base-orm/sqlite-init.js';

// creamos el servidor
const app = express();

// nos permite leer json en el body
app.use(express.json());

// controlar ruta
app.get("/", (req, res) => {
    res.send("Backend Inicial Backend !");
})

// cargamos el modulo de articulofamiliamock (get - get/id - post - put - delete)
app.use("/articulosfamiliasmock", articulofamiliamockRouter);

// cargamos el modulo de articuloFamiliaRouter (get - get/id - post - put - delete)
app.use(articuloFamiliaRouter);

// levantamos servidor
const puerto = 3000;
app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
})