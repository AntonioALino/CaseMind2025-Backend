import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;      
    email: string;
    name: string;
  };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) : any=> {
  console.log("Entrou no middleware authenticateToken");

  const authHeader = req.headers['authorization'];
  console.log("Authorization Header:", authHeader);

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log("Token não fornecido");
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded: any) => {
    if (err) {
      console.log("Erro ao verificar token:", err);
      return res.status(403).json({ message: 'Token inválido' });
    }

    console.log("Token decodificado com sucesso:", decoded);

    req.user = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
    };

    next();
  });
};
