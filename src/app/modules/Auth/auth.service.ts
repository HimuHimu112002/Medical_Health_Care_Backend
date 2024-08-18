import { PrismaClient, UserStatus } from "@prisma/client";
import { generateToken, verifyToken } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const userAuthentication = async (payload: {
  email: string;
  password: string;
}) => {
  const result = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    result.password
  );
  if (!isCorrectPassword) {
    throw new Error("Password Incorrect");
  }
  const accessToken = generateToken(
    {
      email: result.email,
      id: result.id,
      role: result.role,
    },
    config.access_secret as string,
    config.access_expire as string
  );

  const refressToken = generateToken(
    {
      email: result.email,
      id: result.id,
      role: result.role,
    },
    config.refresh_secret as string,
    config.refresh_expire as string
  );

  return {
    accessToken,
    refressToken,
    needPasswordChange: result.needPasswordChange,
  };
};

const refressToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = verifyToken(token, "910124");
  } catch (error) {
    throw new Error("You are not authorized !");
  }

  const result = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData?.email,
      status: UserStatus.ACTIVE,
    },
  });
  const accessToken = generateToken(
    {
      email: result.email,
      id: result.id,
      role: result.role,
    },
    "910124ghj",
    "10m"
  );
  return {
    accessToken,
    needPasswordChange: result.needPasswordChange,
  };
};

export const authServices = {
  userAuthentication,
  refressToken,
};
