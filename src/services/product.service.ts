import prisma from '../utils/database';

export class ProductService {
    async getAllProducts() {
        return prisma.product.findMany();
    }
    
    async getProductById(id: number) {
        return prisma.product.findUnique({
            where: {
                id: id
            }
        });
    }

    async createProduct(data: any) {
        return prisma.product.create({
            data: {
                name: data.name,
                price: data.price,
            }
        });
    }

    async updateProduct(id: number, data: any) {
        return prisma.product.update({
            where: {
                id: id
            },
            data: {
                name: data.name,
                price: data.price,
            }
        });
    }

    async deleteProduct(id: number) {
        return prisma.product.delete({
            where: {
                id: id
            }
        });
    }
}