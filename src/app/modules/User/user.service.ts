import { PrismaClient, UserRole } from "@prisma/client";
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const createAdmin = async (data: any) => {
  const hash: string = await bcrypt.hashSync(data.password, 10)
  const userData = {
    email: data.admin.email,
    password: hash,
    role: UserRole.ADMIN,
  };
  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUserData = await transactionClient.user.create({
      data: userData,
    });
    const createdAdminData = await transactionClient.admin.create({
      data: data.admin,
    });
    return createdAdminData;
  });
  return result;
};
export const userServices = {
  createAdmin,
};
