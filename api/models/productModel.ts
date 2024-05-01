import { Schema, model, Model } from "mongoose";
import { IUser } from "./userModel";
import { ICategory } from "./categoryModel";

export interface IProduct {
  _id: Schema.Types.ObjectId;
  name: string;
  description?: string;
  category: ICategory;
  creator?: IUser;
  status: boolean;
  price: number;
  image: string;
  is_available: boolean;
  quantity: number;
  type: string;
  size: number;
  color: string;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      default: null,
    },

    description: {
      type: String,
      default: null,
    },

    price: {
      type: Number,
      default: 0,
      required: true,
    },

    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true }
);

export const Product: Model<IProduct> = model<IProduct>(
  "Product",
  ProductSchema
);
