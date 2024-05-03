import { Request, Response, NextFunction } from 'express';
import productService from '../../services/productService';

class ProductController {
  async getProducts(req: Request, res: Response): Promise<any> {
    return productService.fetchProducts(req, res);
  }

  async store(req: Request, res: Response) {
    return productService.createProduct(req, res);
  }

  show = async (req: Request, res: Response) => {
    productService.fetchProduct(req, res);
  };

  update = async (req: Request, res: Response) => {
    productService.updateProduct(req, res);
  };

  destroy = async (req: Request, res: Response) => {
    productService.deleteProduct(req, res);
  };
}

export default new ProductController();
