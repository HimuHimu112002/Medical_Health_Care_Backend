import express, { NextFunction, Response, Request } from "express";
import config from "../../config";
import { verifyToken } from "../../helpers/jwtHelpers";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";

export const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED,"You are not an authorization !");
      }
      const verify = verifyToken(token, config.access_secret as string);
      if (roles.length && !roles.includes(verify.role)) {
        throw new ApiError(httpStatus.UNAUTHORIZED,"You are not an authorization !");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
