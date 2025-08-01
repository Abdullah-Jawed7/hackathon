import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

let storageType = "memory" ;   // "disk" || "memory"
export const uploadOnCloudinary = async (localFilePath , storage = storageType) => {
  try {
    // configuring cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    if (!localFilePath) return null;
    // Upload file on cloudinary
    // console.log(localFilePath, " first");
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

     if(storage == "disk") fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log(error, "error");

     if(storage == "disk") fs.unlinkSync(localFilePath);
    // removing the locally saved temporary file as the upload operation got failed
    return null;
  }
};
