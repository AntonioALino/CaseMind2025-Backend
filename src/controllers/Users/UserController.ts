import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { 
    CreateUser,
    DeleteUserById,
    GetUserById,
} from '../../services/Users/UsersServices';

export const CreateUserController = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await CreateUser(name, email, hashedPassword);

        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user" });
    }
}

export const GetUserByIdController = async (req: Request, res: Response) : Promise<any> => {
    try {
        const { id } = req.params;
        const user = await GetUserById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching user" });
    }
}

export const DeleteUserByIdController = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { id } = req.params;
        const user = await DeleteUserById(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting user" });
    }
}