import express, {Router} from 'express';

import { AuthService } from '../services/auth.service';
const authService = new AuthService();

const router = express.Router();

router.post('/signin', async (req: any, res: any) => {
    const {email, password} = req.body;

    try {
        const user = await authService.authenticateUser(email, password);

        const token = authService.generateToken(user);

        res.json({token});
    } catch (error: any) {
        res.status(401).json({message: error.message});
    }
});

router.post('/signup', async (req: any, res: any) => {
    const {email, firstName, lastName, password} = req.body;

    try {
        const newUser = await authService.signUpUser(email, firstName, lastName, password);

        const token = authService.generateToken(newUser);

        res.status(201).json({token});
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
});

export default router;