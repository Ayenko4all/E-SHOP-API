import { Schema, model, Model, Document, Types } from "mongoose";
import { IProduct } from "./productModel";
import { IProductAttribute } from "./productAttribute";

export interface IProductAttributeOption extends Document {
  _id: Types.ObjectId;
  attribute: IProductAttribute | string;
  value: any;
}

const ProductAttributeOptionSchema = new Schema<IProductAttributeOption>(
  {
    attribute: {
      type: Types.ObjectId,
      ref: "ProductAttribute",
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const ProductAttributeOption: Model<IProductAttributeOption> =
  model<IProductAttributeOption>(
    "ProductAttributeOption",
    ProductAttributeOptionSchema
  );
