import jwt from "jsonwebtoken";
import { StatusCode } from "../helpers/statusCode";
import response from "../controllers/apiController";
import { IUser, User } from "../models/userModel";
import { AccessToken, IAccessToken } from "../models/accessTokeen";
import { verifyToken } from "../helpers/tokenHelper";

const { verify } = jwt;

export default async (req: any, res: any, next: any) => {
  try {
    const secret: any = process.env.JWT_KEY;
    let headerToken = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : "";
    let token: any = verify(headerToken, secret);
    const user: IUser = (await User.findById(token.user._id).populate(
      "roles",
      "name"
    )) as IUser;

    if (!(await verifyToken(user, headerToken))) {
      return response.error(res, "Unauthenticated.", StatusCode.UNAUTHORIZED);
    }
    req.user = user;
    next();
  } catch (err) {
    response.error(res, "Unauthenticated.", StatusCode.UNAUTHORIZED);
  }
};
