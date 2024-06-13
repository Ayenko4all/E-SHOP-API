import { Request, Response } from "express";
import response from "../../controllers/apiController";
import { IUser } from "../../models/userModel";
import productRespository from "../../Respositories/productRespository";
import categoryRespository from "../../Respositories/categoryRespository";
import { ICategory } from "../../models/categoryModel";
import { Product } from "../../models/productModel";
import { populate } from "dotenv";

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
      const product = await productRespository.findById(productId);
      return response.respond(
        res,
        { product: product },
        "Product fetch successfully."
      );
    } catch (error: any) {
      console.log(error);
      return response.error(res, error.message);
    }
  }

  public async productListing(req: Request, res: Response) {
    try {
      const catId: any = req.query.cat;
      const sort: any = req.query.sort;
      const filter: any = req.query.filter;

      let catIds: any = [catId];

      const category: ICategory = (await categoryRespository.findById(
        catId
      )) as ICategory;

      const children: any = category.children;

      console.log(children);

      for (let catId of children) {
        catIds.push(catId);
      }

      let categoryProduct = Product.find();

      if (filter || sort) {
        await categoryProduct
          .where({ category: { $in: catIds } })
          .sort()
          .populate("brand", "name")
          .populate("attributes", "name")
          .exec();
      } else {
        await categoryProduct
          .where({ category: { $in: catIds } })
          .populate("brand", "name")
          .populate("attributes", "name")
          .exec();
      }

      return response.respond(
        res,
        categoryProduct,
        "Product listing fetch successfully."
      );
    } catch (error) {}
  }
}

export default new ProductService();
