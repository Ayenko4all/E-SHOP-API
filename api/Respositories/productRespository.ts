import { Request, Response, NextFunction } from "express";
import { Category } from "../models/categoryModel";
import { Product } from "../models/productModel";
import { paginateDocument, queryDocument } from "../helpers/paginator";
import { ProductAttribute } from "../models/productAttribute";
import { ProductAttributeOption } from "../models/productAttributeOption";
import { ProductSku } from "../models/productSku";
import { ProductAttributeOptionSku } from "../models/ProductAttributeOptionSku";

class ProductRespository {
  create = async (product: object) => {
    return await Product.create(product);
  };

  findProducts = async (req: any) => {
    const paginateDocs = paginateDocument(req, "product");
    const query = queryDocument(req);

    return await Product.paginate(query, paginateDocs);
  };

  findProduct = async (param: string) => {
    return await Product.findOne({
      $or: [{ _id: param }, { name: param }],
    }).exec();
  };

  findById = async (id: string) => {
    return await Product.findById(id).populate("category", "name");
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

  createAttribute = async (attributes: object) => {
    return await ProductAttribute.create(attributes);
  };

  createAttributeOption = async (attributeOptions: object) => {
    return await ProductAttributeOption.create(attributeOptions);
  };

  createProductSku = async (sku: object) => {
    return await ProductSku.create(sku);
  };

  linkAttributeToSku = async (data: object) => {
    return await ProductAttributeOptionSku.create(data);
  };

  findAttributeOption = async (param: string) => {
    return await ProductAttributeOption.findOne({
      $or: [{ _id: param }, { name: param }],
    }).exec();
  };
}

export default new ProductRespository();
