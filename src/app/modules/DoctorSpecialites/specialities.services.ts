import { fileUploader } from "../../../helpers/imgFileUploder";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createSpeciality = async (req: any) => {
  const file = req.file;
  if (file) {
    const uploadCloudinaryFile = await fileUploader.uploadCloudinary(file);
    req.body.icon = uploadCloudinaryFile?.secure_url;
  }
    const result = await prisma.specialitie.create({
        data:req.body
    })
    return result
};
export const doctorSpeciality_services = {
  createSpeciality,
};
