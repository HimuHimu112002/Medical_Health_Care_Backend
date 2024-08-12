import { NextFunction, Request, Response } from "express";
import { authServices } from "./auth.service";

const authController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await authServices.userAuthentication(req.body);
    const { refressToken } = result;
    res.cookie("refressToken", refressToken, {
      secure: false,
      // production kaj korar time secure true kore dite hobe
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Login Successfuly",
      data: {
        accessToken: result.accessToken,
        needPasswordChange: result.needPasswordChange,
      },
    });
  } catch (err) {
    next(err);
  }
};

const refressController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {refressToken} = req.cookies;
    const result = await authServices.refressToken(refressToken);
    res.status(200).json({
      success: true,
      message: "Login Successfuly",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const authControllerService = {
  authController,
  refressController,
};
