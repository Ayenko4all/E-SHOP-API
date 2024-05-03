import { Request, Response, NextFunction } from "express";
import productService from "../../services/productService";

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

  storeattribute = async (req: Request, res: Response) => {
    productService.createAttribute(req, res);
  };

  storeAtttributeOption = async (req: Request, res: Response) => {
    productService.createAttributeOption(req, res);
  };

  storeProductSku = async (req: Request, res: Response) => {
    productService.createProductSku(req, res);
  };
}

export default new ProductController();
