// imports
import express from "express";
import articulofamiliamockRouter from "./routes/articulosfamiliasmock.js"

// creamos el servidor
const app = express();

// nos permite leer json en el body
app.use(express.json());

// controlar ruta
app.get("/", (req, res) => {
    res.send("Backend Inicial Backend !");
})

// cargamos el modulo de articulofamiliamock (get - get/id)
app.use("/articulosfamiliasmock", articulofamiliamockRouter);

// levantamos servidor
const puerto = 3000;
app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
})