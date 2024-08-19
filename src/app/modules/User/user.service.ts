import { PrismaClient, UserRole } from "@prisma/client";
import { fileUploader } from "../../../helpers/imgFileUploder";
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const createAdmin = async (req: any) => {
  const file = req.file;
  if (file) {
    const uploadCloudinaryFile = await fileUploader.uploadCloudinary(file);
    console.log(uploadCloudinaryFile);
    req.body.admin.profilePhoto = uploadCloudinaryFile?.secure_url;
  }
  const hash: string = await bcrypt.hashSync(req.body.password, 10);
  const userData = {
    email: req.body.admin.email,
    password: hash,
    role: UserRole.ADMIN,
  };
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });
    const createdAdminData = await transactionClient.admin.create({
      data: req.body.admin,
    });
    return createdAdminData;
  });
  return result;
};

const createDoctorservices = async (req: any) => {
  const file = req.file;
  if (file) {
    const uploadCloudinaryFile = await fileUploader.uploadCloudinary(file);
    req.body.doctor.profilePhoto = uploadCloudinaryFile?.secure_url;
  }
  const hash: string = await bcrypt.hashSync(req.body.password, 12);
  const userData = {
    email: req.body.doctor.email,
    password: hash,
    role: UserRole.DOCTOR,
  };
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });
    const createdDoctorData = await transactionClient.doctor.create({
      data: req.body.doctor,
    });
    return createdDoctorData;
  });
  return result;
};
export const userServices = {
  createAdmin,
  createDoctorservices,
};
