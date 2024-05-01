import { body, check } from "express-validator";

export const createValidator = [
  body("name")
    .isString()
    .isLength({ min: 3 })
    .trim()
    .withMessage("Please enter a valid name."),
];
