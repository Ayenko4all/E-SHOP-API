import { Schema, model, Model } from "mongoose";

import { IUser } from "./userModel";

export interface ICategory {
  _id: Schema.Types.ObjectId;
  name: string;
  description?: string;
  parent?: ICategory;
  creator?: IUser;
  status: boolean;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },

    parent: {
      type: Schema.Types.ObjectId,
      ref: "category",
      default: null,
    },

    description: {
      type: String,
      default: null,
    },

    // price: {
    //   type: Number,
    //   default: 0,
    //   required: true,
    // },

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

export const Category: Model<ICategory> = model<ICategory>(
  "Category",
  CategorySchema
);
