import { Request, Response } from "express";
import {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    updatePost,
 } from '../../services/Posts/PostsServices';

export const createPostController = async (req: Request, res: Response) => {
    try {
        const {title, content, userId} = req.body;
        const image = req.file?.filename ?? "";

        const post = await createPost(title, content, image, userId);
        res.status(201).json(post)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating post" });
    }
}

export const getPostByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const post = await getPostById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching post" });
    }
}

export const getAllPostsController = async (req: Request, res: Response) => {
    try {
        const posts = await getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching posts" });
    }
}

export const getPostsByUserIdController = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const posts = await getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching posts" });
    }
}

export const updatePostController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const post = await updatePost(id, title, content);
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating post" });
    }
}

export const deletePostController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deletePost(id);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting post" });
    }
}