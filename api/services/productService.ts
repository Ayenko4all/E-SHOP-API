import { Request, Response } from "express";
import response from "../controllers/apiController";
import { IUser } from "../models/userModel";
import productRespository from "../Respositories/productRespository";
import { IProduct, Product } from "../models/productModel";
import { validationResult } from "express-validator";
import { StatusCode } from "../helpers/statusCode";
import { Types } from "mongoose";
import { generateAlphanumericString } from "../helpers/tokenHelper";

class ProductService {
  public async fetchProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products = await productRespository.findProducts(req);

      return response.respond(res, products, "Products fetch successfully.");
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

  public async updateProduct(req: Request, res: Response): Promise<Response> {
    try {
      const productId = req.body.product_id;
      const condition = { _id: productId };
      const data = {
        name: req.body.name,
        price: req.body.price,
        selling_price: req.body.selling_price,
        quantity: req.body.quantity,
        category: req.body.category,
        status: req.body.status,
      };
      const product = await productRespository.updateProduct(condition, data);
      return response.respond(
        res,
        { product: product },
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

  public async createAttribute(req: Request, res: Response): Promise<Response> {
    try {
      const data = { name: req.body.name };
      const attribute = await productRespository.createAttribute(data);
      return response.created(
        res,
        { attribute: attribute },
        "Product attribute was created."
      );
    } catch (error: any) {
      console.log(error);
      return response.error(res, error.message);
    }
  }

  public async createAttributeOption(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const attributeId = req.body.attribute_id;
      const data = {
        value: req.body.value,
        attribute: attributeId,
        code: generateAlphanumericString(8),
      };
      const attribute = await productRespository.createAttributeOption(data);
      return response.created(
        res,
        { attribute: attribute },
        "Product attribute was created."
      );
    } catch (error: any) {
      console.log(error);
      return response.error(res, error.message);
    }
  }

  public async createProductSku(
    req: Request,
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

      let files = [];

      const requestFiles: any = req.files;

      for (let file of requestFiles) {
        files.push(file.path);
      }

      const data = {
        product: req.body.product_id,
        attribute_option: req.body.attribute_option_id,
        price: req.body.price,
        stock: req.body.stock,
        code: await generateAlphanumericString(8),
        images: files,
      };

      const sku = await productRespository.createProductSku(data);

      const linkData = {
        attribute_option: req.body.attribute_option_id,
        product_sku: sku._id,
      };

      await productRespository.linkAttributeToSku(linkData);

      return response.created(
        res,
        { product_sku: sku },
        "Product sku was created."
      );
    } catch (error: any) {
      console.log(error);
      return response.error(res, error.message);
    }
  }
}

export default new ProductService();
