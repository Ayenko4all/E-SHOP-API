import { Schema, model } from "mongoose";
import { IRole } from "./roleModel";

export interface IUser {
  _id: Schema.Types.ObjectId;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  address?: string;
  country: string;
  state?: string;
  city?: string;
  email_verified_at?: Date;
  telephone_verified_at?: Date;
  telephone?: string;
  roles: IRole;
}

const useSchema = new Schema<IUser>(
  {
    first_name: {
      type: String,
      required: true,
    },

    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
    },
    city: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
    },
    email_verified_at: {
      type: Date,
      default: null,
    },
    telephone_verified_at: {
      type: Date,
      default: null,
    },
    roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
  },
  { timestamps: true }
);

export const User = model<IUser>("User", useSchema);
