import { Schema, model, Model, Document, Types } from "mongoose";
import { IProduct } from "./productModel";
import { IProductAttribute } from "./productAttribute";

export interface IProductSku extends Document {
  _id: Types.ObjectId;
  product: IProduct | string;
  price: Number;
  stock: Number;
  images: string[];
  code: string;
}

const ProductSkuSchema = new Schema<IProductSku>(
  {
    product: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    images: {
      type: [],
      required: false,
    },
    code: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const ProductSku: Model<IProductSku> = model<IProductSku>(
  "ProductSku",
  ProductSkuSchema
);
