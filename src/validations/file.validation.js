import { defaultAvatar } from "../constants.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"; 
 
 async function validateFileAndUploadOnCloudinary (reqFile,name){
let avatar = defaultAvatar;
if (reqFile && reqFile?.[name] && reqFile[name]?.[0] && reqFile[name][0]?.path ) {
   const avatarLocalPath = reqFile[name][0]?.path ;
    avatar = await uploadOnCloudinary(avatarLocalPath)
}
return avatar
}

export { validateFileAndUploadOnCloudinary}