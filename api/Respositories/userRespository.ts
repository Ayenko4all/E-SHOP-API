import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";

class UserRepository {
  create = async (user: object) => {
    return await User.create(user);
  };

  fetchAll = async () => {
    return await User.find().exec();
  };

  findByEmailOrPhone = async (param: string) => {
    return await User.findOne({
      $or: [{ telephone: param }, { email: param }],
    }).exec();
  };

  updateUser = async (condition: object, data: object) => {
    return await User.findOneAndUpdate(condition, data, { new: true }).exec();
  };
}

export default new UserRepository();
