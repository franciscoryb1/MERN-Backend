import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

declare global {
  namespace Express {
    interface Request {
      auth0Id: string;
      userId: string;
    }
  }
}

// Middleware para verificar el token JWT
// Cada vez que agregue la funcion jwtCheck a mis rutas Express va a pasar la request a la misma.
// La funcion va a verificar el authorization header y si el token es valido y pertenece a un usuario loggeado, va a continuar con la ejecucion de la ruta.
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUT0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256'
});



// Middleware para verificar el token JWT
export const jwtParse = async (req: Request, res: Response, next: NextFunction) => {

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.sendStatus(401); // Unauthorized
    return;
  }

  const token = authorization.split(" ")[1];

  try {

    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0Id = decoded.sub; // sub es el id del usuario en Auth0
    const user = await User.findOne({ auth0Id });

    if (!user) {
      res.sendStatus(401); // Unauthorized
      return;
    }

    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();

    next();


  } catch (error) {
    res.sendStatus(401); // Unauthorized
  }

}