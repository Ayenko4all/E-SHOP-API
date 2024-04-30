import { StatusCode } from "../helpers/statusCode";
import response from "../controllers/apiController";
import { defaultRoles, userRoles } from "../helpers/defaultRole";

export default async (req: any, res: any, next: any) => {
  try {
    const user = req.user;

    const roles = await userRoles(user);

    if (roles.length < 1 || !roles.includes(defaultRoles.ADMIN)) {
      return response.error(
        res,
        "You're not authorized to performe this action",
        StatusCode.UNAUTHORIZED
      );
    }

    next();
  } catch (err: any) {
    return response.error(res, err.message, StatusCode.UNAUTHORIZED);
  }
};
