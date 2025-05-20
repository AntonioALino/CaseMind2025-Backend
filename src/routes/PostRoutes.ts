import { Router } from "express";
import { 
    createPostController,
    getPostByIdController,
    getAllPostsController,
    getPostsByUserIdController,
    updatePostController,
} from "../controllers/Posts/PostsController";
import { authMiddleware } from "../middlewares/AuthMiddlewares";
import { upload } from "../middlewares/UploadImageMiddleware";

const router = Router();

router.post("/posts", authMiddleware, upload.single('image'), createPostController);

router.get("/posts/:id", authMiddleware, getPostByIdController);

router.get("/posts", authMiddleware, getAllPostsController);

router.get("/posts/user/:userId", authMiddleware, getPostsByUserIdController);

router.put("/posts/:id", authMiddleware, updatePostController);

export default router;