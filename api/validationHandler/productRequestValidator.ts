import { body, check } from "express-validator";
import productRespository from "../Respositories/productRespository";

export const createProductValidator = [
  body("name", "Please enter a valid product name.")
    .isString()
    .isLength({ min: 3 })
    .trim()
    .custom(async (value) => {
      const product = await productRespository.findProductByName(value);
      if (product) {
        throw new Error("Product already exist");
      }
    }),
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
  body("status")
    .optional()
    .isBoolean()
    .withMessage("Please enter a valid status."),
];

export const createAttributeRequest = [
  body("product_id", "Please enter a valid product id.")
    .notEmpty()
    .custom(async (value) => {
      const product = await productRespository.findProduct(value);
      if (!product) {
        throw new Error("Product id does not exist");
      }
    }),
  // body("attribute_option_id", "Please enter a valid attribute option id.")
  //   .notEmpty()
  //   .custom(async (value) => {
  //     const attributeOption =
  //       await productRespository.findAttributeOption(value);
  //     if (!attributeOption) {
  //       throw new Error("Product attribute option does not exist");
  //     }
  //   }),
  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Please enter a valid product price."),
  body("stock")
    .isInt({ gt: 0 })
    .withMessage("Please enter a valid product stock."),
];
