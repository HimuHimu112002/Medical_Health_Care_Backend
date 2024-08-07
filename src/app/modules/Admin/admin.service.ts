import { Prisma, PrismaClient } from "@prisma/client";
import calculatePagination from "../../../helpers/paginationHelpers";
const prisma = new PrismaClient();

const getAllAdminData = async () => {
  const result = await prisma.admin.findMany();
  return result;
};

const getSearchAdminData = async (params: any, options: any) => {
  // just avbaei korleo hobe
  //const { page, limit } = options;

  // for reusable code
  const { page, limit, skip } = calculatePagination(options);

  const { searchTerm, ...filterData } = params;
  const conditionArray: Prisma.AdminWhereInput[] = [];
  const adminSearchableFiled = ["name", "email"];

  if (params.searchTerm) {
    conditionArray.push({
      OR: adminSearchableFiled.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
      // ===================== sort code
      // OR: [
      //   {
      //     name: {
      //       contains: params.searchTerm,
      //       mode: "insensitive",
      //     },
      //   },
      //   {
      //     email: {
      //       contains: params.searchTerm,
      //       mode: "insensitive",
      //     },
      //   },
      // ],
    });
  }

  if (Object.keys(filterData).length > 0) {
    conditionArray.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }
  // conditionArray akti array so akhane object convert korar jonno and oparetor use kora hoise array theke object hoiye gese *** where er majhe array support korbena alwas where object accept korbe
  const whereConditions: Prisma.AdminWhereInput = { AND: conditionArray };

  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take:limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  return result;
};

export const adminServices = {
  getAllAdminData,
  getSearchAdminData,
};
