import { Schema, model, Model, Document, PaginateModel, Types } from "mongoose";
import { IUser } from "./userModel";
import { ICategory } from "./categoryModel";
import paginate from "mongoose-paginate-v2";

export interface IProduct extends Document {
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
      ref: "Category",
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

ProductSchema.plugin(paginate);

export const Product: PaginateModel<IProduct> = model<
  IProduct,
  PaginateModel<IProduct>
>("Product", ProductSchema);
