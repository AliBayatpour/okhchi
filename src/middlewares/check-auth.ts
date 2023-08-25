import { NextFunction, Response } from "express";
import { IGetUserAuthInfoRequest } from "../interfaces/get-user-id-req.interface";
import HttpError from "../models/http-error";
import jwt, { JwtPayload } from "jsonwebtoken";
import keys from "../keys";

const checkAuth = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      const error = new HttpError("Authentication failed!", 403);
      return next(error);
    }
    const decodedToken: string | JwtPayload = jwt.verify(token, keys.jwtKey!);
    const userId = decodedToken.sub;
    if (userId && typeof userId === "string") {
      req.userId = userId;
    } else {
      return next(new HttpError("Authentication failed!", 401));
    }
    next();
  } catch (error) {
    console.log(error);

    const err = new HttpError("Authentication failed!", 401);
    return next(err);
  }
};

export default checkAuth;
