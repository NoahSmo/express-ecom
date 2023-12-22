import prisma from '../utils/database';

export class OrderService {
    async getAllOrders() {
        return prisma.order.findMany({
            include: {
                orderItem: true
            }
        });
    }

    async getOrderById(id: number) {
        return prisma.order.findUnique({
            where: {
                id: id
            },
            include: {
                orderItem: true
            }
        });
    }

    async createOrder(data: any) {
        return prisma.order.create({
            data: {
                userId: data.userId,
                orderItem: {
                    create: data.orderItem
                }
            },
            include: {
                orderItem: true
            }
        });
    }

    async updateOrder(id: number, data: any) {
        return prisma.order.update({
            where: {
                id: id
            },
            data: {
                userId: data.userId,
            },
            include: {
                orderItem: true
            }
        });
    }

    async deleteOrder(id: number) {
        return prisma.order.delete({
            where: {
                id: id
            },
            include: {
                orderItem: true
            }
        });
    }
}