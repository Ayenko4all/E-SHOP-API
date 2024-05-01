import { Request, Response } from "express";
import response from "../controllers/apiController";
import { IUser } from "../models/userModel";
import productRespository from "../Respositories/productRespository";
import { IProduct } from "../models/productModel";
import { validationResult } from "express-validator";
import { StatusCode } from "../helpers/statusCode";

class ProductService {
  public async fetchProducts(req: Request, res: Response): Promise<Response> {
    try {
      return response.respond(
        res,
        { products: {} },
        "Products fetch successfully."
      );
    } catch (error: any) {
      console.log(error);
      return response.error(res, error.message);
    }
  }

  public async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return response.error(
          res,
          errors.array()[0].msg,
          StatusCode.UNPROCCESSED_ENTITY
        );
      }

      return response.created(res, { category: {} }, "Product was created.");
    } catch (error: any) {
      console.log(error);
      return response.error(res, error.message);
    }
  }

  public async fetchProduct(req: Request, res: Response): Promise<Response> {
    try {
      return response.respond(
        res,
        { product: {} },
        "Product fetch successfully."
      );
    } catch (error: any) {
      console.log(error);
      return response.error(res, error.message);
    }
  }

  public async updateProduct(req: Request, res: Response): Promise<Response> {
    try {
      return response.respond(
        res,
        { products: {} },
        "Product updated successfully."
      );
    } catch (error: any) {
      console.log(error);
      return response.error(res, error.message);
    }
  }

  public async deleteProduct(req: Request, res: Response): Promise<Response> {
    try {
      return response.Ok(res, "Products deleted successfully.");
    } catch (error: any) {
      console.log(error);
      return response.error(res, error.message);
    }
  }
}

export default new ProductService();
