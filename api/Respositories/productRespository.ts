import { Request, Response, NextFunction } from "express";
import { Category } from "../models/categoryModel";
import { Product } from "../models/productModel";

class ProductRespository {
  create = async (product: object) => {
    return await Product.create(product);
  };

  findProducts = async (req: any) => {
    const next = req.query.next;
    const previous = req.query.previous;

    return await Product.paginate({
      limit: 2,
      next: next,
      previous: previous,
    });
  };

  findProduct = async (param: string) => {
    return await Product.findOne({
      $or: [{ _id: param }, { name: param }],
    }).exec();
  };

  findById = async (id: string) => {
    return await Product.findById(id).exec();
  };

  findChildCategory = async (id: string) => {
    return await Category.find({ parent: id }).exec();
  };

  updateProduct = async (condition: object, data: object) => {
    return await Product.findOneAndUpdate(condition, data, {
      new: true,
    }).exec();
  };

  checkIfIsDeletable = async (id: string): Promise<boolean> => {
    let category = await this.findById(id);

    if (!category) {
      return false;
    }

    const findChildCategory = await this.findChildCategory(id);
    //const products = await this.findChildCategory(id);

    if (findChildCategory) {
      return false;
    }

    return true;
  };

  deleteProduct = async (id: string) => {
    return await Category.findByIdAndDelete(id).exec();
  };
}

export default new ProductRespository();
