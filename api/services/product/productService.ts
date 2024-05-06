import { Request, Response } from "express";
import response from "../../controllers/apiController";
import { IUser } from "../../models/userModel";
import productRespository from "../../Respositories/productRespository";
import categoryRespository from "../../Respositories/categoryRespository";

class ProductService {
  public async fetchProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products = await productRespository.findProducts(req);
      const categories = await categoryRespository.findCategories(req);
      const newProducts = await productRespository.findNewProducts(req);
      const isFeatured = await productRespository.findFeaturedProducts(req);

      const data = {
        categories: categories,
        products,
        isFeatured: isFeatured,
        newProducts: newProducts,
      };

      return response.respond(res, data, "Products fetch successfully.");
    } catch (error: any) {
      console.log(error);
      return response.error(res, error.message);
    }
  }

  public async fetchProduct(req: Request, res: Response) {
    try {
      const productId = req.params.product;
      const product =
        await productRespository.findProductAndItAssociates(productId);
      return response.respond(res, product, "Product fetch successfully.");
    } catch (error: any) {
      console.log(error);
      return response.error(res, error.message);
    }
  }
}

export default new ProductService();
