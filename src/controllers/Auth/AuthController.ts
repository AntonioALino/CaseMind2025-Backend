import { Request, Response } from "express";
import { prisma } from "../../database/Prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginController = async (req: Request, res: Response) : Promise<any> => {
    const {email, password} = req.body;

    try{
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) return res.status(404).json({ message : "Usuário não encontrado"});
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Senha inválida'});
        
        const token = jwt.sign(
             { id: user.id, name: user.name, email: user.email }, // payload útil e seguro
                process.env.JWT_SECRET as string,
                {
                  expiresIn: '30d',
                }
            );


        return (
            res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
                token
            })
        )

        } catch (error) {
            return res.status(500).json({message: "Erro ao fazer login"})
        }
        
}