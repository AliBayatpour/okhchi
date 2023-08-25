import { RequestHandler } from "express";
import HttpError from "../models/http-error";
import userServices from "../services/user-services";

class UserControllers {
  signup: RequestHandler = async (req, res, next) => {
    const { name, email, password } = req.body;
    let response;
    try {
      response = await userServices.signup({ name, email, password });
    } catch (err) {
      return next(new HttpError("sign up failed", 500));
    }

    res.status(200).json(response);
  };

  login: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;
    let response;
    try {
      response = await userServices.login({ email, password });
    } catch (err) {
      return next(new HttpError("sign up failed", 500));
    }

    res.status(200).json(response);
  };
}
export default new UserControllers();
