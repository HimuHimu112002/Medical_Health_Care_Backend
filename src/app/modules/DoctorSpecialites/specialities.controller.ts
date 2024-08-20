import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { doctorSpeciality_services } from "./specialities.services";

const createDoctorSpecialites = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await doctorSpeciality_services.createSpeciality(req);
    res.status(httpStatus.OK).json({
      success: true,
      message: "Doctor Specialities Created Successfuly",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const doctorSpecialties = {
  createDoctorSpecialites,
};
