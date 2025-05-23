import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    getPostBySlug,
    getPostsByUserId,
    updatePost,
 } from '../../services/Posts/PostsServices';
import { AuthRequest } from "../../middlewares/AuthRequest";

export const createPostController = async (req: Request, res: Response) : Promise<any> => {
    try {
    const {title, content, authorId} = req.body;

    const imageFilename = req.file?.filename;

    if (!imageFilename) {
        return res.status(400).json({ message: 'Imagem não enviada' });
    }

    

    // Caminho até a imagem
    const imagePath = path.join(__dirname, '../../../uploads', imageFilename);
    
    // Lê a imagem como buffer
    const imageBuffer = fs.readFileSync(imagePath);

    fs.unlinkSync(imagePath);

    // Chama o service passando o buffer
    const post = await createPost(title, content, authorId, imageBuffer);
    res.status(201).json(post)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating post" });
    }
}

export const getPostByIdController = async (req: Request, res: Response) : Promise<any>=> {
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
        if (posts.length > 0) {
        }
        const postsWithFormattedImage = posts.map(post => ({
            id: post.id,
            title: post.title,
            content: post.content,
            slug: post.slug,
            createdAt: post.createdAt,
            image: `data:image/png;base64,${Buffer.from(post.image).toString('base64')}`,
}));

  

        res.status(200).json(postsWithFormattedImage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching posts" });
    }
}

export const getPostsByUserIdController = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: "Usuário não autenticado" });
    }
    const userId = req.user.id;

    console.log("User ID extraído do token:", userId);

    const posts = await getPostsByUserId(userId);

    const postsWithFormattedImage = posts.map(post => ({
      id: post.id,
      authorId: post.authorId,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      image: `data:image/png;base64,${Buffer.from(post.image).toString("base64")}`,
    }));

    res.status(200).json(postsWithFormattedImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar posts do usuário" });
  }
};

export const getPostBySlugController = async (req: Request, res: Response) : Promise<any> => {
  try {
    const { slug } = req.params;
    const post = await getPostBySlug(slug);

    if (!post) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    const formattedPost = {
      ...post,
      image: `data:image/png;base64,${Buffer.from(post.image).toString('base64')}`
    };

    res.status(200).json(formattedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar post por slug" });
  }
};


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