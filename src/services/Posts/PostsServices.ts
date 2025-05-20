import { prisma } from "../../database/Prisma"

export const createPost = async (title: string, content: string, authorId: string, image: Buffer) => {
    return await prisma.post.create({
        data: {
            title,
            content,
            slug: title.toLowerCase().replace(/\s+/g, '-'), 
            image,
            author: {
                connect: { id: authorId }
            }
        }
    })
}

export const getPostById = async (id : string) => {
    return await prisma.post.findUnique({
        where: {
            id
        }
    })
}

export const getAllPosts = async () => {
    return await prisma.post.findMany({
        select: {
            title: true,
            content: true,
            author: {
                select: {
                    name: true,
                    email: true
                }
            },
            createdAt: true,
        }
    })
}

export const getPostsByUserId = async (userId: string) => {
    return await prisma.post.findMany({
        where: {
            authorId: userId
        },
        select: {
            title: true,
            content: true,
            createdAt: true,
        }
    })
}

export const updatePost = async (id: string, title: string, content: string) => {
    return await prisma.post.update({
        where: {
            id
        },
        data: {
            title,
            content
        }
    })
}

export const deletePost = async (id: string) => {
    return await prisma.post.delete({
        where: {
            id
        }
    })
}