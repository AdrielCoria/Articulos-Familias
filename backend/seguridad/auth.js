// imports
import jwt from 'jsonwebtoken';

// definimos constantes de seguridad
const accessTokenSecret = 'youraccesstokensecret"';
const refreshTokenSecret = 'yourrefreshtokensecrethere";"';

// definimos el middleware de seguridad
const authenticateJWT = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.status(403).jwt({ message: "token no es válido" });
            }
            res.locals.user = user;
            next();
        });
    }
    else {
        res.status(401).json({ message: "Acceso denegado" });
    }
}

export default { authenticateJWT, accessTokenSecret, refreshTokenSecret }