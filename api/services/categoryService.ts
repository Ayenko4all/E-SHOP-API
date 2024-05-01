import { Request, Response } from "express";
import response from "../controllers/apiController";
import { IUser } from "../models/userModel";
import categoryRespository from "../Respositories/categoryRespository";
import { ICategory } from "../models/categoryModel";
import { validationResult } from "express-validator";
import { StatusCode } from "../helpers/statusCode";

class categoryService {
  public async createCategory(
    req: Request | any,
    res: Response
  ): Promise<Response> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return response.error(
          res,
          errors.array()[0].msg,
          StatusCode.UNPROCCESSED_ENTITY
        );
      }

      const user: IUser = req.user;

      const catRequest = {
        name: req.body.name,
        parent: req.body.parent_id,
        description: req.body.description,
        creator: user._id,
      };

      let category = await categoryRespository.create(catRequest);

      return response.created(
        res,
        { category: category },
        "Category was created."
      );
    } catch (error: any) {
      console.log(error);
      return response.error(res, error.message);
    }
  }

  public async fetchCategories(
    req: Request | any,
    res: Response
  ): Promise<Response> {
    try {
      const categories = await categoryRespository.findCategories();

      return response.respond(
        res,
        { categories: categories },
        "Categories fetch successfully."
      );
    } catch (error: any) {
      console.log(error);
      return response.error(res, error.message);
    }
  }

  public async fetchCategory(
    req: Request | any,
    res: Response
  ): Promise<Response> {
    try {
      const catId = req.params.category;

      const category = await categoryRespository.findCategory(catId);

      return response.respond(
        res,
        { category: category },
        "Category fetch successfully."
      );
    } catch (error: any) {
      console.log(error);
      return response.error(res, error.message);
    }
  }

  public async updateCategory(req: Request, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return response.error(
          res,
          errors.array()[0].msg,
          StatusCode.UNPROCCESSED_ENTITY
        );
      }

      const catId: string = req.body.category_id;
      const reqStatus: Boolean = req.body.status;
      const name: string = req.body.name;
      const description: string = req.body.description;
      const parent_id: string = req.body.parent_id;

      const conditions = { _id: catId };
      const data = {
        status: reqStatus,
        name: name,
        description: description,
        parent: parent_id,
      };

      await categoryRespository.updateCategory(conditions, data);

      return response.Ok(res, "Category was updated successfully");
    } catch (error: any) {
      console.log(error);
      return response.error(res, error.message);
    }
  }

  public async deleteCategory(req: Request, res: Response): Promise<Response> {
    try {
      const catId = req.params.category;

      if (!(await categoryRespository.checkIfIsDeletable(catId))) {
        return response.error(
          res,
          "Category can't be deleted because it has active product or child category"
        );
      }

      await categoryRespository.deleteCategory(catId);

      return response.Ok(res, "Category was deleted successfully");
    } catch (error: any) {
      console.log(error);
      return response.error(res, error.message);
    }
  }
}

export default new categoryService();
