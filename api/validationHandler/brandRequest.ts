import { body, check } from "express-validator";
import brandRepository from "../Respositories/brandRepository";

export const createBrandrequest = [
  body("name", "Please enter a valid name.")
    .isString()
    .isLength({ min: 3 })
    .trim()
    .custom(async (value) => {
      const brand = await brandRepository.findBrandByName(value);
      if (brand) {
        throw new Error("Brand already exist");
      }
    }),
];
