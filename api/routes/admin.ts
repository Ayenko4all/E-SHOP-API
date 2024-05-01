import { Router } from "express";
import categoryController from "../controllers/admin/categoryController";
const router = Router();
import { createError } from "../errorHandler/categoryRequestError";

router.get("/categories", categoryController.index);
router.post("/categories", createError, categoryController.store);
router.get("/categories/:category", categoryController.show);
router.patch("/categories", categoryController.update);
router.delete("/categories/:category", categoryController.destroy);

export default router;
