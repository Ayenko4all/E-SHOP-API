import { Schema, model, Model } from "mongoose";
import { IUser } from "./userModel";
import { ICategory } from "./categoryModel";

export interface IProduct {
  _id: Schema.Types.ObjectId;
  name: string;
  description?: string;
  category: ICategory;
  creator: IUser;
  status: boolean;
  price: number;
  selling_price: number;
  quantity: number;
}

const MongoPaging = require("mongo-cursor-pagination");

const ProductSchema = new Schema(
  {
    name: {
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
      required: true,
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

    selling_price: {
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

ProductSchema.plugin(MongoPaging.mongoosePlugin);

export const Product: Model<IProduct> = model<IProduct>(
  "Product",
  ProductSchema
);
