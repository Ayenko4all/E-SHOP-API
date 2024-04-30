import { IUser } from "../models/userModel";

export enum defaultRoles {
  User = "user",
  ADMIN = "admin",
}

export const userRoles = async (user: IUser): Promise<string[]> => {
  let userRoles: string[] = [];

  let roles: any = user.roles;

  for (let role of roles) {
    userRoles.push(role.name);
  }

  return userRoles;
};
