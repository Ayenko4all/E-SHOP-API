import { Request, Response, NextFunction } from "express";
import productService from "../../services/product/productService";

class ProductController {
  fetchProducts = async (req: Request, res: Response) => {
    productService.fetchProducts(req, res);
  };

  fetchProduct = async (req: Request, res: Response) => {
    productService.fetchProduct(req, res);
  };
}

export default new ProductController();
