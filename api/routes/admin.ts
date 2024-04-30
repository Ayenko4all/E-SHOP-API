import { Router } from "express";
import RouteGroup from "express-route-grouping";

import categoryController from "../controllers/admin/categoryController";

const router = Router();

router.get("/categories", categoryController.index);
router.post("/categories", categoryController.store);
router.get("/categories/:category", categoryController.show);
router.patch("/categories", categoryController.update);
router.delete("/categories/:category", categoryController.destroy);

export default router;
