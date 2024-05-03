import { body, check } from "express-validator";
import categoryRespository from "../Respositories/categoryRespository";

export const createValidator = [
  body("name", "Please enter a valid name.")
    .isString()
    .isLength({ min: 3 })
    .trim()
    .custom(async (value) => {
      const cat = await categoryRespository.findCategory(value);
      if (cat) {
        throw new Error("Category already exist");
      }
    }),
];
