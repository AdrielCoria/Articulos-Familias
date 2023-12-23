// imports
import express from 'express';
import jwt from 'jsonwebtoken';
import auth from '../seguridad/auth.js';

const router = express.Router();

const users = [
    {
        usuario: "admin",
        clave: "456",
        rol: "admin"
    },
    {
        usuario: "adriel",
        clave: "456",
        rol: "member"
    }
];

let refreshTokens  = [];

// endpoint para autenticación
router.post("/api/login", (req, res) => {
    const { usuario, clave } = req.body;

    // Filtramos un usuario del array usuarios por usuario y clave
    const user = users.find((u) => {
        return u.usuario === usuario && u.clave === String(clave); // Lo convertimos para que coincida en tipo
    });

    if (user) {
        // Generamos el access token
        const accessToken = jwt.sign(
            { usuario: user.usuario, rol: user.rol },
            auth.accessTokenSecret,
            { expiresIn: "20m" }
        );

        // avanzado
        const refreshToken = jwt.sign(
            { usuario: user.usuario, rol: user.rol },
            auth.refreshTokenSecret
        );

        refreshTokens.push(refreshToken);

        res.json({
            accessToken,
            refreshTokens,
            message: "Bienvenido " + user.usuario + "al sistema !"
        });
    }
    else{
        res.json({message: "usuario o clave incorrecta"});
    }
});


// logout
router.post("/api/logout", (req, res) =>{
    
    // cerramos el token
    let message = "Logout inválido!";
    const {token} = req.body;
    if(refreshTokens.includes(token)){
        message: "Usuario deslogueado correctamente !";
    }
    refreshTokens = refreshTokens.filter((t) => t !== token);

    res.json({message});
});

// token de refresco
router.post("/api/token", (req, res) =>{
    const {refreshToken} = req.body;

    if(!refreshToken){
        return res.sendStatus(401);
    }

    if(!refreshToken.includes(refreshToken)){
        return res.sendStatus(403);
    }

    jwt.verify(refreshToken, auth.refreshTokenSecret, (err, user) =>{
        if(err){
            return res.sendStatus(403);
        }
    });


    const acccessToken = jwt.sign(
        {usuario: user.usuario, rol: user.rol},
        auth.accessTokenSecret,
        {expiresIn: "20m"}
    );

    res.json({
        acccessToken
    });
});

export default router;