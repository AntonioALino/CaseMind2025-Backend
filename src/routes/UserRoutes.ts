import { Router } from "express";
import { 
    CreateUserController,
    GetUserByIdController,
    DeleteUserByIdController,
} from "../controllers/Users/UserController";
import { authMiddleware } from "../middlewares/AuthMiddlewares";

const router = Router();

router.post("/users", CreateUserController);

router.get("/users/:id", authMiddleware, GetUserByIdController);

router.delete("/users/:id", authMiddleware, DeleteUserByIdController);

export default router;
