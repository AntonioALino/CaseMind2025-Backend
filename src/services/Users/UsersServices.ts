import { prisma } from "../../database/Prisma";

export const CreateUser = async( email: string, password: string) => {
    return await prisma.user.create({
        data: {
            email,
            password
        }
    })
}

export const GetUserById = async(id: string) => {
    return await prisma.user.findUnique({
        where: {
            id
        }
    })
}

export const DeleteUserById = async(id: string) => {
    return await prisma.user.delete({
        where: {
            id
        }
    })
}