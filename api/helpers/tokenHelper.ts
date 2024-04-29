import jwt from "jsonwebtoken";
import { IUser } from "../models/userModel";
import { Token } from "../models/tokenModel";
import {
  sendResetPasswordNotification,
  sendVerificationNotification,
} from "./mailer";
import moment from "moment";

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
  const secret: any = process.env.JWT_KEY;
  const token = jwt.sign(
    { email: user.email, password: user.password },
    secret,
    {
      expiresIn: "1h",
    }
  );
  return token;
};
