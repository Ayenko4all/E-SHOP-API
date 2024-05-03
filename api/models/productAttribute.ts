import { Schema, model, Model } from "mongoose";
import { IProduct } from "./productModel";

export interface IProductAttribute {
  _id: Schema.Types.ObjectId;
  name: string;
}

const ProductAttributeSchema = new Schema<IProductAttribute>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const ProductAttribute: Model<IProductAttribute> =
  model<IProductAttribute>("ProductAttribute", ProductAttributeSchema);
