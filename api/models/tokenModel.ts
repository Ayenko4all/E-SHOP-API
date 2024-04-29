import { Schema, model, Model } from "mongoose";

export interface IToken {
  email?: string;
  telephone?: string;
  token: number;
  verified: boolean;
  type: string;
  expires_in: Date;
}

const tokenSchema = new Schema<IToken>(
  {
    token: {
      type: Number,
      required: true,
    },

    email: {
      type: String,
      default: null,
    },

    telephone: {
      type: String,
      default: null,
    },

    type: {
      type: String,
      required: true,
    },

    expires_in: {
      type: Date,
      required: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//export const Token = model<IToken>("Token", tokenSchema);

export const Token: Model<IToken> = model<IToken>("Token", tokenSchema);
