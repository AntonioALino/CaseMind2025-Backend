import { Router } from "express";

import { 
    loginController,
} from "../controllers/Auth/AuthController";

const router = Router();

router.post("/login", loginController);

export default router;