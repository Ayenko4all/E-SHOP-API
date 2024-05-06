import { Schema, model, Model, Types } from "mongoose";
import { IProduct } from "./productModel";

export interface IProductAttribute {
  _id: Types.ObjectId;
  product: IProduct;
  name: String;
  value: String;
  color: string;
  price: Number;
  stock: Number;
  images: string[];
  code: string;
}

const ProductAttributeSchema = new Schema<IProductAttribute>(
  {
    product: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    images: {
      type: [],
      required: false,
    },
  },
  { timestamps: true }
);

export const ProductAttribute: Model<IProductAttribute> =
  model<IProductAttribute>("ProductAttribute", ProductAttributeSchema);
