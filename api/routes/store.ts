import { Router } from "express";
const router = Router();

import productController from "../controllers/store/productController";

router.get("/products", productController.fetchProducts);
router.get("/products/:product", productController.fetchProduct);

export default router;
