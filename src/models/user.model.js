import mongoose ,{Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt  from "jsonwebtoken";


const userSchema = new  Schema(
    {
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim: true, 
    },
    fullName:{
        type: String,
        required: true,
        trim: true, 
        index: true
    },
    identityNumber:{
        type: String,
        required: true,
        unique: true,
    },
    country:{
        type:String,
         lowercase:true,
        trim: true, 
    },
    city:{
         type:String,
         lowercase:true,
        trim: true, 
    },
     avatar:{
        type: String, // cloudinary URL
    },
    password:{
        type: String,
        required: true,
    },
    otp:{
        type:String,
        required:true
    },
    otpVerified:{
        type:Boolean,
        default:false,
    },
    otpExpiry:{
        type:Date,
        default:  Date.now() + 600000, // OTP expires in 10 minutes
    },
      isAdmin: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },


    },
    {
      timestamps: true  
    })


    // pre is an mongo db hook for any work we want to perform just before saving data on db
userSchema.pre("save" , async function (next) {   // Don't use arrow function because it have "this" to window
    if(!this.isModified("password")) return next(); // Condition to insure that middleware only works when password modify
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password ,this.password)    
}
userSchema.methods.isOtpCorrect = function (otp) {
 const verify =  otp === this.otp && Date.now() < this.otpExpiry
    return verify    
}

// method for generating jwt access token 
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            userName:this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
export const User  = mongoose.model("User", userSchema);