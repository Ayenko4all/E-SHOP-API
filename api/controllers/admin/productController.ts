import { Request, Response, NextFunction } from "express";
import productService from "../../services/product/admiProductService";

class ProductController {
  index = async (req: Request, res: Response) => {
    productService.fetchProducts(req, res);
  };

  store = async (req: Request, res: Response) => {
    productService.createProduct(req, res);
  };

  show = async (req: Request, res: Response) => {
    productService.fetchProduct(req, res);
  };

  update = async (req: Request, res: Response) => {
    productService.updateProduct(req, res);
  };

  destroy = async (req: Request, res: Response) => {
    productService.deleteProduct(req, res);
  };

  storeAttribute = async (req: Request, res: Response) => {
    productService.createAttribute(req, res);
  };

  storeImage = async (req: Request, res: Response) => {
    productService.createAttribute(req, res);
  };
}

export default new ProductController();
