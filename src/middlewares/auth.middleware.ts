import {NextFunction, Response} from "express";
import jwt from "jsonwebtoken";

export default class AuthMiddleware {

    async checkAdmin(req: any, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({message: "Missing Authorization Header"});
        }

        const token = authHeader.split(' ')[1];

        try {
            const decodedToken: any = jwt.decode(token);

            if (decodedToken.role !== 'ADMIN') {
                return res.status(401).json({message: "Unauthorized"});
            }

            next();
        } catch (error: any) {
            return res.status(401).json({message: error.message});
        }
    }

    async checkManager(req: any, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({message: "Missing Authorization Header"});
        }

        const token = authHeader.split(' ')[1];

        try {
            const decodedToken: any = jwt.decode(token);

            if (decodedToken.role !== 'MANAGER' && decodedToken.role !== 'ADMIN') {
                return res.status(401).json({message: "Unauthorized"});
            }

            next();
        } catch (error: any) {
            return res.status(401).json({message: error.message});
        }
    }

    async checkUser(req: any, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({message: "Missing Authorization Header"});
        }

        const token = authHeader.split(' ')[1];

        try {
            const decodedToken: any = jwt.decode(token);

            if (decodedToken.role !== 'USER' && decodedToken.role !== 'MANAGER' && decodedToken.role !== 'ADMIN') {
                return res.status(401).json({message: "Unauthorized"});
            }

            next();
        }
        catch (error: any) {
            return res.status(401).json({message: error.message});
        }
    }
}