import { Admin, Prisma, PrismaClient, UserStatus } from "@prisma/client";
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

    conditionArray.push({
      isDeleted: false
    })
  // conditionArray akti array so akhane object convert korar jonno and oparetor use kora hoise array theke object hoiye gese *** where er majhe array support korbena alwas where object accept korbe
  const whereConditions: Prisma.AdminWhereInput = { AND: conditionArray };

  const result = await prisma.admin.findMany({
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
  });
  const total = await prisma.admin.count({
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

const getIdByAdminData = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findFirstOrThrow({
    where: {
      id,
      isDeleted: false
      // soft deleted data show korbena
    },
  });
  const result = await prisma.admin.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateByAdminData = async (id: string, data: Partial<Admin>) => {
  await prisma.admin.findFirstOrThrow({
    where: {
      id,
      isDeleted: false
    },
  });
  const result = await prisma.admin.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteByAdminData = async (id: string) => {
  await prisma.admin.findFirstOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeleteData = await transactionClient.admin.delete({
      where: {
        id,
      },
    });

    const userDeleteData = await transactionClient.user.delete({
      where: {
        email: adminDeleteData.email
      },
    });
    return adminDeleteData
  });
  return result;
};

const softdeleteByAdminData = async (id: string) => {
  await prisma.admin.findFirstOrThrow({
    where: {
      id,
      isDeleted: false
    },
  });
  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeleteData = await transactionClient.admin.update
    ({
      where: {
        id,
      },
      data:{
        isDeleted: true
      }
    });

    const userDeleteData = await transactionClient.user.update({
      where: {
        email: adminDeleteData.email
      },
      data:{
        status: UserStatus.BLOCKED
      }
    });
    return adminDeleteData
  });
  return result;
};

export const adminServices = {
  getAllAdminData,
  getSearchAdminData,
  getIdByAdminData,
  updateByAdminData,
  deleteByAdminData,
  softdeleteByAdminData
};
