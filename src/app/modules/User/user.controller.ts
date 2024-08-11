import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";
import httpStatus from "http-status";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userServices.createAdmin(req.body);
    res.status(httpStatus.OK).json({
      success: true,
      message: "Admin Created Successfuly",
      data: result,
    });
  } catch (err) {
    next(err)
  }
};
export const userController = {
  createAdmin,
};
