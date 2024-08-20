import {
  Prisma,
  PrismaClient,
  UserRole,
  UserStatus,
} from "@prisma/client";
import { fileUploader } from "../../../helpers/imgFileUploder";
import calculatePagination from "../../../helpers/paginationHelpers";
import { UserSearchableFiled } from "./user.constant";
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

const getSearchUserData = async (params: any, options: any) => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const conditionArray: Prisma.UserWhereInput[] = [];

  if (params.searchTerm) {
    conditionArray.push({
      OR: UserSearchableFiled.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    conditionArray.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.UserWhereInput =
    conditionArray.length > 0 ? { AND: conditionArray } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
    // jei value guli dekhte chai amra
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },

    // include:{
    //   Admin:true,
    //   // patient:true,
    //   // doctor:true
    // }
  });
  const total = await prisma.user.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateByUserStatus = async (id: string, status: UserRole) => {
  await prisma.user.findFirstOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: status,
  });
  return result;
};

const profileServices = async (id: string) => {
  await prisma.user.findFirstOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const updateUserProfile = async (user: string, req:any) => {
  const userInfo = await prisma.user.findFirstOrThrow({
    // update er jonno email use korte hobe id hobena karon user er sathe admin connect so user and admin email same id not same se jonno email diye khuje update korte hobe
    where: {
      email: user,
      status: UserStatus.ACTIVE,
    },
  });
  const file = req.file
  if (file) {
    const uploadCloudinaryFile = await fileUploader.uploadCloudinary(file);
    req.body.profilePhoto = uploadCloudinaryFile?.secure_url;
  }
  let profileInfo;
  if (userInfo.role === UserRole.ADMIN) {
    profileInfo = await prisma.admin.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  }
  if (userInfo.role === UserRole.DOCTOR) {
    profileInfo = await prisma.doctor.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  }
  return { ...profileInfo };
};

export const userServices = {
  createAdmin,
  createDoctorservices,
  getSearchUserData,
  updateByUserStatus,
  profileServices,
  updateUserProfile,
};
