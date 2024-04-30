import { Schema, model, Model } from "mongoose";

import { IPermission } from "./permissionModel";
import { IUser } from "./userModel";

export interface IRole {
  name: string;
  description?: string;
}

const roleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: [true, "Title should not be empty!"],
    },

    description: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

//export const Role = model<IRole>("Role", roleSchema);

export const Role: Model<IRole> = model<IRole>("Role", roleSchema);
