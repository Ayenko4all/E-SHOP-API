import { Request, Response } from "express";
import response from "../controllers/apiController";
import { IUser } from "../models/userModel";
import productRespository from "../Respositories/productRespository";
import { IProduct, Product } from "../models/productModel";
import { validationResult } from "express-validator";
import { StatusCode } from "../helpers/statusCode";
import { Types } from "mongoose";

class ProductService {
  public async fetchProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products = await productRespository.findProducts(req);

      return response.respond(
        res,
        { products: products },
        "Products fetch successfully."
      );
    } catch (error: any) {
      console.log(error);
      return response.error(res, error.message);
    }
  }

  public async createProduct(
    req: Request | any,
    res: Response
  ): Promise<Response> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return response.error(
          res,
          errors.array()[0].msg,
          StatusCode.UNPROCCESSED_ENTITY
        );
      }

      const user: IUser = req.user;

      const productRequest = {
        name: req.body.name,
        price: req.body.price,
        selling_price: req.body.selling_price,
        quantity: req.body.quantity,
        category: req.body.category,
        creator: user._id,
      };

      const product = await productRespository.create(productRequest);
      return response.created(
        res,
        { product: product },
        "Product was created."
      );
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
