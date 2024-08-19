import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { fileInterfase } from "../app/interface/file";
cloudinary.config({
  cloud_name: "dffw2zrr5",
  api_key: "879715882165616",
  api_secret: "-7j54s0n-hRoo1yZlkIh16nO3AM",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// upload cloudinary
const uploadCloudinary = async (
  file: any
): Promise<fileInterfase | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      (error: Error, result: fileInterfase) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};
export const fileUploader = {
  upload,
  uploadCloudinary,
};
