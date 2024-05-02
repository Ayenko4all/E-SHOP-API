import jwt from "jsonwebtoken";
import { IUser, User } from "../models/userModel";
import { Token } from "../models/tokenModel";
import {
  sendResetPasswordNotification,
  sendVerificationNotification,
} from "./mailer";
import moment from "moment";
import { AccessToken, IAccessToken } from "../models/accessTokeen";

export const generateVerificationToken = async (
  param: string,
  type: string,
  verificationReason: string
): Promise<number> => {
  let telephone;
  let email;

  await Token.findOneAndDelete({
    $and: [
      { type: verificationReason },
      { $or: [{ telephone: param }, { email: param }] },
    ],
  });

  if (type === "telephone") {
    telephone = param;
    email = null;
  } else {
    telephone = null;
    email = param;
  }

  let token: any = Math.floor(100000 + Math.random() * 900000);

  const expiresIn: any = moment().add(10, "minutes");

  token = await Token.create({
    token: token,
    email: email,
    telephone: telephone,
    type: verificationReason,
    expires_in: expiresIn,
  });

  verificationReason === "verification"
    ? sendVerificationNotification(token.email, token.token)
    : sendResetPasswordNotification(token.email, token.token);

  return token;
};

export const generateAccessToken = async (user: IUser): Promise<string> => {
  deleteAccessToken(user);
  const secret: any = process.env.JWT_KEY;
  const token = jwt.sign({ user }, secret, { expiresIn: "1h" });
  storeAccessToken(token, user);
  return token;
};

export const storeAccessToken = async (token: string, user: IUser) => {
  const accessToken = await AccessToken.create({
    token: token,
    user: user._id,
  });
  console.log(accessToken);
};

export const deleteAccessToken = async (user: IUser) => {
  await AccessToken.deleteOne({ user: user._id });
};

export const verifyToken = async (
  user: IUser,
  token: string
): Promise<IAccessToken | null> => {
  return await AccessToken.findOne({ user: user._id, token: token })
    .lean<IAccessToken>()
    .exec();
};
