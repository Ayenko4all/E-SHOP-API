import { Request, Response, NextFunction } from "express";
import { Category } from "../models/categoryModel";
import { paginateDocument, queryDocument } from "../helpers/paginator";
import productRespository from "./productRespository";

class CategoryRespository {
  create = async (category: object) => {
    return await Category.create(category);
  };

  findCategories = async (req: any) => {
    const paginateDocs = paginateDocument(req, "category");
    const query = queryDocument(req);
    return await Category.paginate(query, paginateDocs);
  };

  findCategory = async (param: string) => {
    return await Category.findOne({
      $or: [{ _id: param }, { name: param }],
    }).exec();
  };

  findById = async (id: string) => {
    return await Category.findById(id).exec();
  };

  findChildCategory = async (id: string) => {
    return await Category.find({ parent: id }).exec();
  };

  updateCategory = async (condition: object, data: object) => {
    return await Category.findOneAndUpdate(condition, data, {
      new: true,
    }).exec();
  };

  checkIfIsDeletable = async (id: string): Promise<boolean> => {
    let category = await this.findById(id);

    if (!category) {
      return false;
    }

    const findChildCategory = await this.findChildCategory(id);
    const products = await this.findCategoryProducts(id);

    if (findChildCategory || products) {
      return false;
    }

    return true;
  };

  deleteCategory = async (id: string) => {
    return await Category.findByIdAndDelete(id).exec();
  };

  findCategoryProducts = async (id: string) => {
    return await productRespository.findProduct(id);
  };
}

export default new CategoryRespository();
