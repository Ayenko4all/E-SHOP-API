import jwt from "jsonwebtoken";
import { StatusCode } from "../helpers/statusCode";
import apiResponse from "../controllers/apiController";
import { IUser, User } from "../models/userModel";

const { verify } = jwt;

export default async (req: any, res: any, next: any) => {
  try {
    const secret: any = process.env.JWT_KEY;
    let token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : "";
    token = verify(token, secret);
    const user: IUser = (await User.findById(token.user._id).populate(
      "roles",
      "name"
    )) as IUser;
    req.body = { user: user };
    next();
  } catch (err) {
    apiResponse.respondWithError(
      res,
      "Unauthenticated.",
      StatusCode.UNAUTHORIZED
    );
  }
};
