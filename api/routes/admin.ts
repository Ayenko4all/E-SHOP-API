import { Router } from "express";
const router = Router();
import categoryController from "../controllers/admin/categoryController";
import brandController from "../controllers/admin/brandController";
import productController from "../controllers/admin/productController";
import { createValidator } from "../validationHandler/categoryRequestValidator";
import {
  createProductValidator,
  createAttributeRequest,
} from "../validationHandler/productRequestValidator";
import fileUpload from "../helpers/fileUpload";
import { createBrandrequest } from "../validationHandler/brandRequest";

router.get("/categories", categoryController.index);
router.post("/categories", createValidator, categoryController.store);
router.get("/categories/:category", categoryController.show);
router.patch("/categories", categoryController.update);
router.delete("/categories/:category", categoryController.destroy);

router.get("/products", productController.index);
router.post("/products", createProductValidator, productController.store);
router.get("/products/:product", productController.show);
router.patch("/products", createProductValidator, productController.update);
router.delete("/products/:product", productController.destroy);
router.post(
  "/products/attribute",
  fileUpload.array("images"),
  createAttributeRequest,
  productController.storeAttribute
);
// router.get("/products/attribute/:attribute", productController.show);
// router.delete("/products/attribute/:attribute", productController.destroy);

router.get("/brands", brandController.index);
router.post("/brands", createBrandrequest, brandController.store);
router.get("/brands/:brand", brandController.show);
router.patch("/brands", createBrandrequest, brandController.update);
router.delete("/brands/:brand", brandController.destroy);

export default router;
