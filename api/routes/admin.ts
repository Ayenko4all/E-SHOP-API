import { Router } from "express";
const router = Router();
import categoryController from "../controllers/admin/categoryController";
import productController from "../controllers/admin/productController";
import { createValidator } from "../validationHandler/categoryRequestValidator";
import {
  createProductValidator,
  createSkuRequest,
} from "../validationHandler/productRequestValidator";
import fileUpload from "../helpers/fileUpload";

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

//router.get("/products/attribute", productController.attributeIndex);
router.post("/products/attribute", productController.storeattribute);
router.patch(
  "/products/attribute/options",
  productController.storeAtttributeOption
);
router.post(
  "/products/sku",
  fileUpload.array("images"),
  createSkuRequest,
  productController.storeProductSku
);
// router.get("/products/attribute/:attribute", productController.show);
// router.delete("/products/attribute/:attribute", productController.destroy);

export default router;
