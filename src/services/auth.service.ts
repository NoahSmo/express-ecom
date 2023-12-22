import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export class AuthService {
    async authenticateUser(email: string, password: string) {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new Error('Invalid email or password');
        }

        return user;
    }

    async signUpUser(email: string, firstName: string, lastName: string, password: string) {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new Error('Email is already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                password: hashedPassword,
            },
        });
    }

    generateToken(user: any) {
        const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        };

        return jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' });
    }

    verifyToken(token: string) {
        return jwt.verify(token, 'your-secret-key');
    }
}