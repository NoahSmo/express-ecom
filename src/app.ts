import express from 'express';

import authController from "./controllers/auth.controller";

import userController from "./controllers/user.controller";
import productController from "./controllers/product.controller";
import orderController from "./controllers/order.controller";

import AuthMiddleware from "./middlewares/auth.middleware";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const authMiddleware = new AuthMiddleware();

app.use('/auth', authController);

app.use('/users', authMiddleware.checkAdmin, userController);
app.use('/products', productController);
app.use('/orders', authMiddleware.checkUser, orderController);

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port http://localhost:${port}`);
});
