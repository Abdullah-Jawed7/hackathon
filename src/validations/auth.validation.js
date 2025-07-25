import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";


 const validateForm =async (formData ,res) => {
  const {email}= formData
  const isUserExist =  await User.findOne({email});

  if (!formData.fullName) {
    return res.status(400).json( new ApiError(400 ,"Name is required" ))
  } else if (formData.fullName.length < 3) {
    return res.status(402).json( new ApiError(402 , "Name must be at least 3 characters"))
  }

  if (!formData.email) {
     return res.status(400).json( new ApiError(400 ,"Email is required" ))
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
     return res.status(402).json( new ApiError(402 , "Email is invalid"))
  } else if(isUserExist){
    return res.status(402).json( new ApiError(402, "Email is registered . try Login"))
  }

//   if (!formData.identityNumber) {
//      return res.status(400).json( new ApiError(400 ,"Identity Number is required" ))
//   } else if (formData.identityNumber.length != 13) {
//      return res.status(402).json( new ApiError(402 , "Identity Number must be 13 characters"))
//   }

  if (!formData.password) {
     return res.status(400).json( new ApiError(400 ,"Password is required" ))
  } else if (formData.password.length < 8) {
     return res.status(402).json( new ApiError(402 , "Password must be at least 8 characters"))
  }

  if (!formData.cPassword) {
     return res.status(400).json( new ApiError(400 ,"Please confirm your password" ))
  } else if (formData.password !== formData.cPassword) {
     return res.status(400).json( new ApiError(402 , "Passwords do not match"))
  }

  return true;
};

const validateLogin = async (body , res)=>{

   const { email, password } = await body;
     if (!email ) {
       return res.status(400).json( new ApiError(400, " email is required"))
     }

   const isUserExist =  await User.findOne({  email});
   if (!isUserExist) {
       return res.status(402).json( new ApiError(402, "User does not exist. try Register"))
   }
   if (!isUserExist.otpVerified) {
       return res.status(402).json( new ApiError(402, "Email doesn't verified"))
   }

    const isPasswordValid = await isUserExist.isPasswordCorrect(password);
   
     if (!isPasswordValid) {
        return res.status(401).json( new ApiError(401, "Invalid user credentials"));
     }
    return isUserExist;
   
}

export {
   validateForm,
   validateLogin,
}