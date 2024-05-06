import e, { Request, Response, NextFunction } from "express";
import { Category } from "../models/categoryModel";
import { IProduct, Product } from "../models/productModel";
import { paginateDocument, queryDocument } from "../helpers/paginator";
import {
  IProductAttribute,
  ProductAttribute,
} from "../models/productAttributeModel";

class ProductRespository {
  create = async (product: object) => {
    return await Product.create(product);
  };

  findPaginatedProducts = async (req: any) => {
    console.log(req.query);

    const paginateDocs = paginateDocument(req, "product");
    const query = queryDocument(req);

    return await Product.paginate(query, paginateDocs);
  };

  findProducts = async (req: any) => {
    const query = queryDocument(req);

    return await Product.find(query);
  };

  findFeaturedProducts = async (req: any) => {
    return await Product.aggregate([
      { $match: { is_fetaured: "Yes", status: true } },
    ])
      .limit(5)
      .exec();
  };

  findNewProducts = async (req: any) => {
    return await Product.find({ status: true })
      .sort("createdAt")
      .limit(5)
      .exec();
  };

  findProduct = async (param: string) => {
    return await Product.findOne({
      $or: [{ _id: param }, { name: param }],
    }).exec();
  };

  findProductByName = async (param: string) => {
    return await Product.findOne({ name: param }).exec();
  };

  findById = async (id: string) => {
    return await Product.findById(id)
      .populate({
        path: "category",
        select: "name",
      })
      .populate("brand", "name")
      .populate("attributes");
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

    return true;
  };

  deleteProduct = async (id: string) => {
    return await Category.findByIdAndDelete(id).exec();
  };

  createAttribute = async (attributes: object) => {
    const attribute: any = await ProductAttribute.create(attributes);
    await Product.updateOne(
      { _id: attribute.product },
      { $push: { attributes: attribute._id } }
    );

    return attribute;
  };

  findBrandProducts = async (brandId: string) => {
    return await Product.find({ brand: brandId });
  };

  findProductAndItAssociates = async (param: string) => {
    let product: IProduct = (await this.findById(param)) as IProduct;

    const data = {};

    return data;
  };
}

export default new ProductRespository();
