import { Schema, model, Model, Document, PaginateModel, Types } from "mongoose";
import { IUser } from "./userModel";
import { ICategory } from "./categoryModel";
//import { mongoosePagination, Pagination } from "mongoose-paginate-ts";
import paginate from "mongoose-paginate-v2";

export interface IProduct extends Document {
  _id: Types.ObjectId;
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

const ProductSchema = new Schema<IProduct>(
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

//ProductSchema.plugin(mongoosePagination);

//productSchema.plugin(MongoPaging.mongoosePlugin);

// export const Product: Pagination<IProduct> = model<
//   IProduct,
//   Pagination<IProduct>
// >("Product", ProductSchema);

ProductSchema.plugin(MongoPaging.mongoosePlugin);

// export const Product: Model<IProduct> = model<IProduct>(
//   "Product",
//   ProductSchema
// );

//ProductSchema.plugin(paginate);

export const Product: PaginateModel<IProduct> = model<
  IProduct,
  PaginateModel<IProduct>
>("Product", ProductSchema);
