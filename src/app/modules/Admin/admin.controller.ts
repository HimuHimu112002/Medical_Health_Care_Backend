import { Request, Response } from "express";
import { adminServices } from "./admin.service";
import pick from "../../../dataPick";
import { filterableFiled } from "./admin.constant";

const fetchAllAdminData = async (req: Request, res: Response) => {
  try {
    const result = await adminServices.getAllAdminData();
    res.status(200).json({
      success: true,
      message: "Admin Fetch Successfuly",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err?.name || "Somthing Went Wrong !",
      error: err,
    });
  }
};

const searchAdminData = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, filterableFiled);
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder'])
    const result = await adminServices.getSearchAdminData(filters, options);
    res.status(200).json({
      success: true,
      message: "Admin Search Data Get Successful",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err?.name || "Somthing Went Wrong !",
      error: err,
    });
  }
};
export const adminController = {
  fetchAllAdminData,
  searchAdminData,
};
