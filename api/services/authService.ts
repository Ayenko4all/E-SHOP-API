import { Request, Response } from "express";
import { hash, compare } from "bcrypt";
import apiResponse from "../controllers/apiController";
import UserRepository from "../Respositories/userRespository";
import { StatusCode } from "../helpers/statusCode";
import {
  generateVerificationToken,
  generateAccessToken,
} from "../helpers/tokenHelper";
import { IToken, Token } from "../models/tokenModel";
import { IRole, Role } from "../models/roleModel";
import { sendWelcomeNotification } from "../helpers/mailer";
import { defaultRoles } from "../helpers/defaultRole";
import RoleRepository from "../Respositories/roleRespository";
import moment from "moment";
import { checkTokenExpiration } from "../helpers/checkIfTokenHasExpires";

class AuthService {
  public async createUser(req: Request, res: Response) {
    try {
      let user = await UserRepository.findByEmailOrPhone(req.body.email);

      if (user) {
        return apiResponse.respondWithError(
          res,
          "The email already exist.",
          422
        );
      }

      const hashPassword = await hash(req.body.password, 10);

      const role = await RoleRepository.findRole(defaultRoles.User);

      const userRequest = {
        email: req.body.email,
        password: hashPassword,
        telephone: req.body.telephone,
        address: req.body.address,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        roles: role,
      };

      user = await UserRepository.create(userRequest);

      const reason = "verification";

      await generateVerificationToken(userRequest.email, "email", reason);

      sendWelcomeNotification(user);

      const message =
        "Registration successfully. Please check your email for a verification token";

      return apiResponse.respondCreated(res, user, message);
    } catch (error: any) {
      console.log(error);
      return apiResponse.respondWithError(res, error.message);
    }
  }

  public async loginUser(req: Request, res: Response) {
    const password = req.body.password;
    const email = req.body.email;

    try {
      let user = await UserRepository.findByEmailOrPhone(email);

      if (!user) {
        return apiResponse.respondWithError(
          res,
          "Invalid credentials.",
          StatusCode.UNPROCCESSED_ENTITY
        );
      }

      if (!user.email_verified_at) {
        return apiResponse.respondWithError(
          res,
          "Please verify your email address.",
          StatusCode.UNPROCCESSED_ENTITY
        );
      }

      // const values = Object.values(defaultRoles);
      // values.forEach(async (value) => {
      //   await Role.create({ name: value });
      // });

      const checkPassword = await compare(password, user.password);

      if (!checkPassword) {
        return apiResponse.respondWithError(
          res,
          "Invalid credentials.",
          StatusCode.UNPROCCESSED_ENTITY
        );
      }

      const token = await generateAccessToken(user);

      return apiResponse.respondCreated(
        res,
        {
          user: user,
          token: token,
        },
        "Access token created successfully."
      );
    } catch (error: any) {
      console.log(error);
      return apiResponse.respondWithError(res, error.message);
    }
  }

  public async forgotPassword(req: Request, res: Response) {
    try {
      const email = req.body.email;
      const telephone = req.body.telephone;
      const type = req.body.type;
      const reason = "password";

      const requestValue = telephone ?? email;

      let user = await UserRepository.findByEmailOrPhone(requestValue);

      if (!user) {
        return apiResponse.respondWithError(
          res,
          "Invalid email or telephone provided.",
          StatusCode.UNPROCCESSED_ENTITY
        );
      }

      await generateVerificationToken(requestValue, type, reason);

      return apiResponse.respondOk(res, "Token sent to your registered email.");
    } catch (error: any) {
      return apiResponse.respondWithError(res, error.message);
    }
  }

  public async resetPassword(req: Request, res: Response) {
    try {
      const email = req.body.email;
      const telephone = req.body.telephone;
      let token = req.body.token;

      token = await Token.findOne({ token: token })
        .where({
          $or: [{ telephone: telephone }, { email: email }],
        })
        .exec();

      if (await checkTokenExpiration(token)) {
        return apiResponse.respondWithError(
          res,
          "Verifcation token is invalid or has expired. Please request another one.",
          StatusCode.UNPROCCESSED_ENTITY
        );
      }

      const hashPassword = await hash(req.body.password, 10);

      const condition = { email: token.email };
      const data = { password: hashPassword };

      await UserRepository.updateUser(condition, data);

      await Token.findByIdAndDelete(token._id);

      return apiResponse.respondOk(
        res,
        "Your password was updated successfully."
      );
    } catch (error: any) {
      return apiResponse.respondWithError(res, error.message);
    }
  }

  public async requestVerificationToken(req: Request, res: Response) {
    try {
      const email = req.body.email;
      const telephone = req.body.telephone;
      const type = req.body.type;
      const reason = "verification";

      const requestValue = telephone ?? email;

      let user = await UserRepository.findByEmailOrPhone(requestValue);

      if (!user) {
        return apiResponse.respondWithError(
          res,
          "Invalid email or telephone provided.",
          StatusCode.UNPROCCESSED_ENTITY
        );
      }

      await generateVerificationToken(requestValue, type, reason);

      return apiResponse.respondOk(
        res,
        `Verification token sent to your registered ${requestValue}.`
      );
    } catch (error: any) {
      return apiResponse.respondWithError(res, error.message);
    }
  }

  public async tokenVerification(req: Request, res: Response) {
    let condition;
    let data;
    try {
      const email = req.body.email;
      const telephone = req.body.telephone;
      let token = req.body.token;

      token = await Token.findOne({ token: token }).where({
        $or: [{ telephone: telephone }, { email: email }],
      });

      if (await checkTokenExpiration(token)) {
        return apiResponse.respondWithError(
          res,
          "Verifcation token is invalid or has expired. Please request another one.",
          StatusCode.UNPROCCESSED_ENTITY
        );
      }

      const currentTime = moment();

      if (email) {
        condition = { email: token.email };
        data = { email_verified_at: currentTime };
      } else {
        condition = { telephone: token.telephone };
        data = { telephone_verified_at: currentTime };
      }

      await UserRepository.updateUser(condition, data);

      await Token.findByIdAndDelete(token._id);

      return apiResponse.respondOk(res, "Token verifed successfully.");
    } catch (error: any) {
      return apiResponse.respondWithError(res, error.message);
    }
  }
}

export default new AuthService();
