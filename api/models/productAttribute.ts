import { Schema, model, Model } from "mongoose";
import { IProduct } from "./productModel";
import { ICategory } from "./categoryModel";

export interface IProductAttribute {
  _id: Schema.Types.ObjectId;
  name: string;
  product_id: IProduct;
  price: number;
  image: string;
  is_available: boolean;
  quantity: number;
  type?: string;
  size?: number;
  color?: string;
}

const ProductAttributeSchema = new Schema<IProductAttribute>(
  {
    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    size: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    price: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

export const ProductAttribute: Model<IProductAttribute> =
  model<IProductAttribute>("ProductAttribute", ProductAttributeSchema);
