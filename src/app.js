"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("./routes/product"));
const product_2 = __importDefault(require("./routes/product"));
const product_3 = __importDefault(require("./routes/product"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use('/products', product_2.default);
app.use('/users', product_1.default);
app.use('/orders', product_3.default);
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
