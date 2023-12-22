import prisma from '../utils/database';
import bcrypt from "bcrypt";

export class UserService {
    async getAllUsers() {
        return prisma.user.findMany();
    }

    async getUserById(id: number) {
        return prisma.user.findUnique({
            where: {
                id: id
            }
        });
    }

    async createUser(data: any) {
        return prisma.user.create({
            data: {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                password: bcrypt.hashSync(data.password, 10),
                role: data.role,
            }
        });
    }

    async updateUser(id: number, data: any) {
        return prisma.user.update({
            where: {
                id: id
            },
            data: {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                password: bcrypt.hashSync(data.password, 10),
                role: data.role,
            }
        });
    }

    async deleteUser(id: number) {
        return prisma.user.delete({
            where: {
                id: id
            }
        });
    }
}