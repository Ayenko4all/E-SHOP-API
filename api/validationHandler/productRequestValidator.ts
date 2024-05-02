import { body, check } from "express-validator";
import { isNumber } from "util";

export const createProductValidator = [
  body("name")
    .isString()
    .isLength({ min: 3 })
    .trim()
    .withMessage("Please enter a valid product name."),
  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Please enter a valid product price."),
  body("selling_price")
    .isNumeric()
    .isFloat({ gt: 0 })
    .withMessage("Please enter a valid product selling price."),
  body("quantity")
    .isInt({ gt: 0 })
    .withMessage("Please enter a valid product quantity."),
  body("price").isNumeric().withMessage("Please enter a valid product price."),
];
