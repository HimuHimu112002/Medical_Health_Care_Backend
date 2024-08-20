import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";
import httpStatus from "http-status";
import pick from "../../../dataPick";
import { UserfilterableFiled } from "./user.constant";
import jwt from "jsonwebtoken";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userServices.createAdmin(req);
    res.status(httpStatus.OK).json({
      success: true,
      message: "Admin Created Successfuly",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const createDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userServices.createDoctorservices(req);
    res.status(httpStatus.OK).json({
      success: true,
      message: "Doctor Created Successfuly",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const searchDoctorData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filters = pick(req.query, UserfilterableFiled);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const result = await userServices.getSearchUserData(filters, options);
    res.status(200).json({
      success: true,
      message: "User Search Data Get Successful",
      meta: result.meta,
      data: result.data,
    });
  } catch (err) {
    next(err);
  }
};

const updateUserStatusData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization;
    const decoded = jwt.decode(token as string);
    if (decoded && typeof decoded === "object") {
      const result = await userServices.updateByUserStatus(
        decoded.id,
        req.body
      );
      res.status(200).json({
        success: true,
        message: "User Status Update Successful",
        data: result,
      });
    } else {
      console.log("Invalid token");
    }
  } catch (err) {
    next(err);
  }
};

const getMyProfileData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization;
    const decoded = jwt.decode(token as string);
    if (decoded && typeof decoded === "object") {
      const result = await userServices.profileServices(decoded.id);
      res.status(200).json({
        success: true,
        message: "Get My Profile Data",
        data: result,
      });
    } else {
      console.log("Invalid token");
    }
  } catch (err) {
    next(err);
  }
};

const updateUserProfileData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization;
    const decoded = jwt.decode(token as string);
    if (decoded && typeof decoded === "object") {
      const result = await userServices.updateUserProfile(decoded.email, req);
      res.status(200).json({
        success: true,
        message: "User Profile Update Successful",
        data: result,
      });
    } else {
      res.send("Invalid token");
    }
  } catch (err) {
    next(err);
  }
};

export const userController = {
  createAdmin,
  createDoctor,
  searchDoctorData,
  updateUserStatusData,
  getMyProfileData,
  updateUserProfileData,
};
