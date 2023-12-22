import express from 'express';

const router = express.Router();

import { UserService } from '../services/user.service';
const userService = new UserService();

router.get('/', async (req, res) => {
    try {
        const allUsers = await userService.getAllUsers();

        return res.status(200).json({
            success: true,
            data: allUsers
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await userService.getUserById(Number(req.params.id));

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        return res.status(404).json({
            success: false,
            error: 'User does not exist'
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body);

        return res.status(201).json({
            success: true,
            data: newUser
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'User could not be created'
        });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(Number(req.params.id), req.body);

        return res.status(200).json({
            success: true,
            data: updatedUser
        });
    } catch (err) {
        return res.status(404).json({
            success: false,
            error: 'User could not be updated'
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await userService.deleteUser(Number(req.params.id));

        return res.status(200).json({
            success: true,
            data: deletedUser
        });
    } catch (err) {
        return res.status(404).json({
            success: false,
            error: 'User could not be deleted'
        });
    }
});

export default router;