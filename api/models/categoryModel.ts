import { Schema, model, Model, Document, PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";

import { IUser } from "./userModel";

export interface ICategory extends Document {
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

CategorySchema.plugin(paginate);

export const Category: PaginateModel<ICategory> = model<
  ICategory,
  PaginateModel<ICategory>
>("Category", CategorySchema);
