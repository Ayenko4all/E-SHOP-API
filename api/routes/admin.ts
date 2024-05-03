import { Router } from "express";
const router = Router();
import categoryController from "../controllers/admin/categoryController";
import productController from "../controllers/admin/productController";
import { createValidator } from "../validationHandler/categoryRequestValidator";
import { createProductValidator } from "../validationHandler/productRequestValidator";

router.get("/categories", categoryController.index);
router.post("/categories", createValidator, categoryController.store);
router.get("/categories/:category", categoryController.show);
router.patch("/categories", categoryController.update);
router.delete("/categories/:category", categoryController.destroy);

router.get("/products", productController.getProducts);
router.post("/products", createProductValidator, productController.store);
router.get("/products/:product", productController.show);
router.patch("/products", productController.update);
router.delete("/products/:product", productController.destroy);

export default router;
