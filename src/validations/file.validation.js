import { defaultAvatar } from "../constants.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"; 
 
 async function validateDiskStorageMultipleFilesAndUploadOnCloudinary (reqFile,name){
    // work for upload.fields[] in route
let avatar = defaultAvatar;
if (reqFile && reqFile?.[name] && reqFile[name]?.[0] && reqFile[name][0]?.path ) {
   const avatarLocalPath = reqFile[name][0]?.path ;
    avatar = await uploadOnCloudinary(avatarLocalPath , "disk")
}
return avatar
}


async function validateMemoryStorageMultipleFilesAndUploadOnCloudinary(files ,name) {
    let avatar =defaultAvatar;
    //   not tested yet
    if (files && files?.[name] && files[name]?.[0] && files[name][0]?.buffer && files[name][0]?.mimetype ) {
     const b64 = Buffer.from(files[name][0]?.buffer).toString("base64");
        let dataURI = "data:" + files[name][0]?.mimetype + ";base64," + b64;
        avatar = await uploadOnCloudinary(dataURI , "memory")
}
        return avatar;
    
}

async function validateSingleFileAndUploadOnCLoudinary(file) {
    let avatar = defaultAvatar;
    if (file && file?.path) {
        // for disk storage
        avatar = await uploadOnCloudinary(file.path ,"disk")
    } else if (file && file?.buffer && file?.mimetype){
        // for memory storage
         const b64 = Buffer.from(file.buffer).toString("base64");
        let dataURI = "data:" + file.mimetype + ";base64," + b64;
        avatar = await uploadOnCloudinary(dataURI , "memory")
    }

    return avatar;
}

export { 
  validateSingleFileAndUploadOnCLoudinary
}

   

   