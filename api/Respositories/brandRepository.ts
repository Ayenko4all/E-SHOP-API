import { Request, Response, NextFunction } from "express";
import { Brand } from "../models/brandModel";
import { paginateDocument, queryDocument } from "../helpers/paginator";
import productRespository from "./productRespository";

class BrandRespository {
  create = async (category: object) => {
    return await Brand.create(category);
  };

  findBrands = async (req: any) => {
    const query = queryDocument(req);
    return await Brand.find(query);
  };

  findPaginatedBrands = async (req: any) => {
    const paginateDocs = paginateDocument(req, "category");
    const query = queryDocument(req);
    return await Brand.paginate(query, paginateDocs);
  };

  findBrand = async (param: string) => {
    return await Brand.findOne({
      $or: [{ _id: param }, { name: param }],
    }).exec();
  };

  findById = async (id: string) => {
    return await Brand.findById(id).exec();
  };

  findBrandByName = async (name: string) => {
    return await Brand.findOne({ name: name }).exec();
  };

  updateBrand = async (condition: object, data: object) => {
    return await Brand.findOneAndUpdate(condition, data, {
      new: true,
    }).exec();
  };

  checkIfIsDeletable = async (id: string): Promise<boolean> => {
    let brand = await this.findById(id);

    if (!brand) {
      return false;
    }
    const products = await this.findBrandProducts(id);

    if (products) {
      return false;
    }

    return true;
  };

  deleteBrand = async (id: string) => {
    return await Brand.findByIdAndDelete(id).exec();
  };

  findBrandProducts = async (id: string) => {
    return await productRespository.findBrandProducts(id);
  };
}

export default new BrandRespository();
