import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface JWTPayload {
    sub: string;
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token faltando" });
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = verify(token, process.env.JWT_SECRET as string);
        const { sub } = decoded as JWTPayload;

        req.user_id = sub;
        return next();
    } catch (err) {
        return res.status(401).json({ message: "Token inválido" });
    }
}
