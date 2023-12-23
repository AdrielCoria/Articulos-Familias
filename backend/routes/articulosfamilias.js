// imports
import express from "express";
import { db } from '../base-orm/sequelize-init.js';

const router = express.Router();

// enpoint Get
router.get("/api/articulosfamilias", async function (req, res, next) {
    let data = await db.articulosFamilias.findAll({
        attributes: ["IdArticuloFamilia", "Nombre"]
    });
    res.json(data);
});

// enpoint Get/:id
router.get("/api/articulosfamilias/:id", async function (req, res, next) {
    // #swagger.tags = ['ArticulosFamilias']
    // #swagger.summary = 'obtiene un ArticuloFamilia'
    // #swagger.parameters['id'] = { description: 'identificador del ArticulosFamilias...' }

    // Buscamos en articulosfamilias aquel atributo que coincida con el parámetro de la query string
    let data = await db.articulosFamilias.findAll({
        attributes: ["IdArticuloFamilia", "Nombre"],
        where: { IdArticuloFamilia: req.params.id },
    });

    if (data.length > 0)
        res.json(data[0]);
    else
        res.status(404).json({ mensaje: 'No encontrado!!' })
});

export default router;