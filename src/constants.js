import dotenv from 'dotenv';
dotenv.config()

const defaultAvatar ={
 url :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYI05R8njC7PiGxxK_l04fxSBAVOV68Op0S-HaNH48kFJ480Y-V7ouPY7jC6RINKdxVNE&usqp=CAU'
} 


const DB_NAME = "hackathon"
const nodemailer_mail  = process.env.NODEMAILER_MAIL
const nodemailer_pass  = process.env.NODEMAILER_PASSWORD

export{
    DB_NAME,
    nodemailer_mail,
    nodemailer_pass,
    defaultAvatar,
}