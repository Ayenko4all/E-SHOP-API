import { Schema, model, Model, Document, PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { IUser } from "./userModel";

export interface IBrand extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  creator?: IUser;
  status: boolean;
}

const BrandSchema = new Schema<IBrand>(
  {
    name: {
      type: String,
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

BrandSchema.plugin(paginate);

export const Brand: PaginateModel<IBrand> = model<
  IBrand,
  PaginateModel<IBrand>
>("Brand", BrandSchema);
