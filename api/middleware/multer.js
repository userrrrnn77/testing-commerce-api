import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/Cloudinary.js";

const uploadImage = (folder) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: { folder, allowed_formats: ["jpg", "png", "jpeg", "webp", "avif"] },
  });

  return multer({
    storage,
    limits: { fileSize: 4 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only Image files are allowed"));
      }
      cb(null, true);
    },
  });
};

export const productImage = uploadImage("productImage")
export const userImage = uploadImage("userProfile")