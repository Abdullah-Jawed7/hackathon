import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { validateForm, validateLogin } from "../validations/auth.validation.js";
import { validateFileAndUploadOnCloudinary } from "../validations/file.validation.js";
import { generateRandomNumber } from "../utils/generateRandomNumber.js";
import { sendEmail } from "../utils/mail.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, identityNumber, password, cPassword } = req.body;
  await validateForm(req.body, res);
  const avatar = await validateFileAndUploadOnCloudinary(req.files, "avatar");

  let data = {
    fullName,
    avatar: avatar.url,
    identityNumber,
    email,
    password,
  };

  if (req.body?.country) {
    data.country = req.body?.country;
  }
  if (req.body?.city) {
    data.city = req.body?.city;
  }
  // generating otp
  const otp = generateRandomNumber();
  data.otp = otp;
  data.otpExpiry = Date.now() + 600000; // OTP expires in 10 minutes
  // create user
  const user = await User.create(data);

  // check is user created successfully
  const isUserCreated = await User.findById(user._id)?.select(
    "-password -otp -otpExpiry -isAdmin -otpVerified -isActive"
  );

  if (!isUserCreated) {
    return res
      .status(500)
      .json(new ApiError(500, "Something went wrong while registering user"));
  }

  await sendEmail(
    email,
    "you registered on MS",
    `Confirm your registration  by putting this otp "${otp}" on your verification screen`
  );
  // sending response to frontend

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        isUserCreated,
        "User registered successfully! and otp send to your email"
      )
    );
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { id, otp } = req.body;
  // find user with this id
  const isUserExist = await User.findById(id);
  if (!isUserExist) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }

  const otpVerification = await isUserExist?.isOtpCorrect(otp);

  if (!otpVerification) {
    return res.status(401).json(new ApiError(401, "Invalid or expired Otp"));
  }
    isUserExist.otp = "";
    isUserExist.otpVerified = true; 
    await isUserExist.save({ validateBeforeSave: false });

  const accessToken = await isUserExist?.generateAccessToken();

  const loggedInUser = await User.findById(isUserExist._id).select(
    "-password -otp -otpExpiry -isAdmin -otpVerified -isActive"
  );
  const data = {
    ...loggedInUser._doc,
    accessToken: accessToken,
  };

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, data, "Otp verified Successfully"));
});

const sendOtp = asyncHandler(async (req, res) => {
  try {
    const isUserExist = await User.findById(req?.params?.id);
    if (!isUserExist) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }
    if (isUserExist.otpVerified) {
      return res.status(400).json(new ApiError(400, "Email verified"));
    }

    // generating otp

    const otp = generateRandomNumber();

    isUserExist.otp = otp;
    isUserExist.otpExpiry = Date.now() + 600000; // OTP expires in 10 minutes
    await isUserExist.save({ validateBeforeSave: false });
    await sendEmail(
      isUserExist.email,
      "you registered on MS",
      `Confirm your registration  by putting this otp "${otp}" on your verification screen`
    );
    console.log("email sended");
    return res
      .status(202)
      .json(new ApiResponse(202, {}, "Otp send successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiError(500, "Something went wrong while  sending otp", error)
      );
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const user = await validateLogin(req.body, res);
  console.log(req?.body);
  console.log(user);

  const accessToken = await user.generateAccessToken();

  const loggedInUser = await User.findById(user._id).select(
    "-password -otp -otpExpiry -isAdmin -otpVerified -isActive"
  );

  if (!loggedInUser) {
    return res
      .status(500)
      .json(new ApiError(500, "Something went wrong while logging user"));
  }

  const data = {
    ...loggedInUser._doc,
    accessToken: accessToken,
  };
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, data, "User logged In Successfully"));
});

export { registerUser, verifyOtp, sendOtp, loginUser };
