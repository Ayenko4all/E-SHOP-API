import { body, check } from "express-validator";
import userRespository from "../Respositories/userRespository";
import { Token } from "../models/tokenModel";
import { checkTokenExpiration } from "../helpers/checkIfTokenHasExpires";

export const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .trim()
    .withMessage("Password length not should be less than 8 characters."),
];

export const registerValidator = [
  body("first_name", "Please enter first name").notEmpty().isString(),
  body("last_name", "Please enter last name").notEmpty().isString(),
  body("telephone", "Please enter last name").optional().isString(),
  body("country", "Please enter country").isString(),
  body("state", "Please enter state").optional().isString(),
  body("city", "Please enter city").optional().isString(),
  body("address", "Please enter a valid address name")
    .optional()
    .isString()
    .isLength({ min: 5 }),
  body("email", "Please enter a valid email address")
    .notEmpty()
    .isEmail()
    .custom(async (value) => {
      const user = await userRespository.findByEmailOrPhone(value);
      if (user) {
        throw new Error("E-mail already exist");
      }
    })
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .trim()
    .withMessage("Password length not should be less than 8 characters."),
];

export const tokenRequestValidator = [
  body("email", "Please enter a valid email address.")
    .notEmpty()
    .isEmail()
    .custom(async (value) => {
      const user = await userRespository.findByEmailOrPhone(value);
      if (!user) {
        throw new Error("Invalid email or telephone provided.");
      }
    })
    .normalizeEmail(),
  check("type", "Please enter a valid type."),
];

export const resetPasswordValidator = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .trim()
    .withMessage("Password length not should be less than 8 characters."),
  body("token")
    .isLength({ min: 6, max: 6 })
    .trim()
    .custom(async (value, { req }) => {
      let token = await Token.findOne({ token: value }).where({
        $or: [{ telephone: req.body.telephone }, { email: req.body.email }],
      });
      if (await checkTokenExpiration(token)) {
        throw new Error(
          "Verifcation token is invalid or has expired. Please request another one."
        );
      }
    }),
];

export const verificationValidator = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(),
  body("token")
    .isLength({ min: 6, max: 6 })
    .trim()
    .custom(async (value, { req }) => {
      let token = await Token.findOne({ token: value }).where({
        $or: [{ telephone: req.body.telephone }, { email: req.body.email }],
      });
      if (await checkTokenExpiration(token)) {
        throw new Error(
          "Verifcation token is invalid or has expired. Please request another one."
        );
      }
    }),
];
