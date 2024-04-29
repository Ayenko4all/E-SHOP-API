import { Schema, model } from "mongoose";
import { IRole } from "./roleModel";

export interface IPermission {
  name: string;
  description?: string;
}

const permissionSchema = new Schema<IPermission>(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const Permission = model<IPermission>("Permission", permissionSchema);
