import { Request, Response, NextFunction } from "express";
import brandService from "../../services/brandService";

class BrandController {
  index = async (req: Request, res: Response) => {
    brandService.fetchBrands(req, res);
  };

  store = async (req: Request, res: Response) => {
    brandService.createBrand(req, res);
  };

  show = async (req: Request, res: Response) => {
    brandService.fetchBrand(req, res);
  };

  update = async (req: Request, res: Response) => {
    //brandService.updateCategory(req, res);
  };

  destroy = async (req: Request, res: Response) => {
    brandService.deleteBrand(req, res);
  };
}

export default new BrandController();
