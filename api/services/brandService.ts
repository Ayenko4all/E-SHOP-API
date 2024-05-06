import { Request, Response } from "express";
import response from "../controllers/apiController";
import { IUser } from "../models/userModel";
import brandRespository from "../Respositories/brandRepository";
import { ICategory } from "../models/categoryModel";
import { validationResult } from "express-validator";
import { StatusCode } from "../helpers/statusCode";

class BrandService {
  public async createBrand(
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

      const brandRequest = {
        name: req.body.name.toLowerCase(),
        creator: user._id,
      };

      let brand = await brandRespository.create(brandRequest);

      return response.created(
        res,
        { brand: brand },
        "Brand created successfully."
      );
    } catch (error: any) {
      console.log(error);
      return response.error(res, error.message);
    }
  }

  public async fetchBrands(
    req: Request | any,
    res: Response
  ): Promise<Response> {
    try {
      const brands = await brandRespository.findBrands(req);

      return response.respond(
        res,
        { brands: brands },
        "Brands fetch successfully."
      );
    } catch (error: any) {
      console.log(error);
      return response.error(res, error.message);
    }
  }

  public async fetchBrand(
    req: Request | any,
    res: Response
  ): Promise<Response> {
    try {
      const BrandId = req.params.brand;

      const brand = await brandRespository.findById(BrandId);

      return response.respond(
        res,
        { brand: brand },
        "Brand fetch successfully."
      );
    } catch (error: any) {
      console.log(error);
      return response.error(res, error.message);
    }
  }

  public async deleteBrand(req: Request, res: Response): Promise<Response> {
    try {
      const brandId = req.params.brand;

      if (!(await brandRespository.checkIfIsDeletable(brandId))) {
        return response.error(
          res,
          "Brand can't be deleted because it has active product"
        );
      }

      await brandRespository.deleteBrand(brandId);

      return response.Ok(res, "Brand was deleted successfully");
    } catch (error: any) {
      console.log(error);
      return response.error(res, error.message);
    }
  }
}

export default new BrandService();
