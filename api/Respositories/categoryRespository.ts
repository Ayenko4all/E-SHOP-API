import { Request, Response, NextFunction } from "express";
import { Category } from "../models/categoryModel";

class CategoryRespository {
  create = async (category: object) => {
    return await Category.create(category);
  };

  findCategories = async () => {
    return await Category.find().exec();
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
    //const products = await this.findChildCategory(id);

    if (findChildCategory) {
      return false;
    }

    return true;
  };

  deleteCategory = async (id: string) => {
    return await Category.findByIdAndDelete(id).exec();
  };
}

export default new CategoryRespository();
