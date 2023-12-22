import express from 'express';

const router = express.Router();

import { OrderService } from '../services/order.service';
const orderService = new OrderService();

import AuthMiddleware from "../middlewares/auth.middleware";
const authMiddleware = new AuthMiddleware();

router.get('/', authMiddleware.checkManager, async (req, res) => {
    try {
        const allOrders = await orderService.getAllOrders();

        return res.status(200).json({
            success: true,
            data: allOrders
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: "Server Error"
        });
    }
});

router.get('/:id', authMiddleware.checkManager, async (req, res) => {
    try {
        const order = await orderService.getOrderById(Number(req.params.id));

        return res.status(200).json({
            success: true,
            data: order
        });
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            success: false,
            error: "Order does not exist"
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const newOrder = await orderService.createOrder(req.body);

        return res.status(201).json({
            success: true,
            data: newOrder
        });
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            success: false,
            error: "Order could not be created"
        });
    }
});

router.patch('/:id', authMiddleware.checkManager, async (req, res) => {
    try {
        const updatedOrder = await orderService.updateOrder(Number(req.params.id), req.body);

        return res.status(200).json({
            success: true,
            data: updatedOrder
        });
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            success: false,
            error: 'Order could not be updated'
        });
    }
});

router.delete('/:id', authMiddleware.checkManager, async (req, res) => {
    try {
        const deletedOrder = await orderService.deleteOrder(Number(req.params.id));

        return res.status(200).json({
            success: true,
            data: deletedOrder
        });
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            success: false,
            error: 'Order could not be deleted'
        });
    }
});

export default router;