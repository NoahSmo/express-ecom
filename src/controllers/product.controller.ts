import express from 'express';

const router = express.Router();

import { ProductService } from '../services/product.service';
const productService = new ProductService();


import AuthMiddleware from "../middlewares/auth.middleware";
const authMiddleware = new AuthMiddleware();

router.get('/', async (req, res) => {
    try {
        const allProducts = await productService.getAllProducts();

        return res.status(200).json({
            success: true,
            data: allProducts
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "Server Error"
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await productService.getProductById(Number(req.params.id));

        return res.status(200).json({
            success: true,
            data: product
        });
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            success: false,
            error: "Product does not exist"
        });
    }
});

router.post('/', authMiddleware.checkManager, async (req, res) => {
    try {
        const newProduct = await productService.createProduct(req.body);

        return res.status(201).json({
            success: true,
            data: newProduct
        });
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            success: false,
            error: "Product could not be created"
        });
    }
});

router.patch('/:id', authMiddleware.checkManager, async (req, res) => {
    try {
        const updatedProduct = await productService.updateProduct(Number(req.params.id), req.body);

        return res.status(200).json({
            success: true,
            data: updatedProduct
        });
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            success: false,
            error: "Product could not be updated"
        });
    }
});

router.delete('/:id', authMiddleware.checkManager, async (req, res) => {
    try {
        const deletedProduct = await productService.deleteProduct(Number(req.params.id));

        return res.status(200).json({
            success: true,
            data: deletedProduct
        });
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            success: false,
            error: "Product could not be deleted"
        });
    }
});

export default router;