import { Request, Response, NextFunction } from "express";
import { Role } from "../models/roleModel";

class RoleRepository {
  create = async (role: object) => {
    return await Role.create(role);
  };

  fetchAll = async () => {
    return await Role.find().exec();
  };

  findRole = async (param: string) => {
    return await Role.findOne({ name: param }).select("_id").exec();
  };

  updateUser = async (condition: object, data: object) => {
    return await Role.findOneAndUpdate(condition, data, { new: true }).exec();
  };
}

export default new RoleRepository();
