import moment from "moment";
import { IToken } from "../models/tokenModel";

export const checkTokenExpiration = async (
  token: IToken | null
): Promise<boolean> => {
  if (!token) {
    return true;
  }

  const currentTime = moment();
  const expiresIn = moment(token.expires_in);

  if (currentTime.isAfter(expiresIn)) {
    return true;
  }

  return false;
};
