import { Schema, model, Model } from "mongoose";

import { IPermission } from "./permissionModel";
import { IUser } from "./userModel";

export interface IAccessToken {
  token: string;
  user: IUser;
  expires_at: Date;
}

const AccessTokenSchema = new Schema<IAccessToken>(
  {
    token: {
      type: String,
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    expires_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const AccessToken: Model<IAccessToken> = model<IAccessToken>(
  "AccessToken",
  AccessTokenSchema
);
