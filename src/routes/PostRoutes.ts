import { Router } from "express";
import { 
    createPostController,
    getPostByIdController,
    getAllPostsController,
    getPostsByUserIdController,
    updatePostController,
    getPostBySlugController,
} from "../controllers/Posts/PostsController";
import { authMiddleware } from "../middlewares/AuthMiddlewares";
import { upload } from "../middlewares/UploadImageMiddleware";
import { authenticateToken } from "../middlewares/AuthRequest";

const router = Router();

router.post("/posts", authMiddleware, upload.single('image'), createPostController);

router.get("/posts/:slug" , getPostBySlugController);

router.get("/users/posts", authenticateToken, getPostsByUserIdController);

router.get("/posts/:id", getPostByIdController);

router.get("/posts", getAllPostsController);

router.put("/posts/:id", authMiddleware, upload.single('image'), updatePostController);

export default router;