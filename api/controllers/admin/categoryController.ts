import { Request, Response, NextFunction } from "express";
import categoryService from "../../services/categoryService";

class CategoryController {
  index = async (req: Request, res: Response) => {
    categoryService.fetchCategories(req, res);
  };

  store = async (req: Request, res: Response) => {
    categoryService.createCategory(req, res);
  };

  show = async (req: Request, res: Response) => {
    categoryService.fetchCategory(req, res);
  };

  update = async (req: Request, res: Response) => {
    categoryService.updateCategory(req, res);
  };

  destroy = async (req: Request, res: Response) => {
    categoryService.deleteCategory(req, res);
  };
}

export default new CategoryController();
