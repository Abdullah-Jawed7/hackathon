import nodemailer from 'nodemailer';
import { nodemailer_mail, nodemailer_pass } from '../constants.js';

const emailConfig = {
    service: 'gmail',
    auth: {
        user: nodemailer_mail, //NODEMAILER_MAIL
        pass: nodemailer_pass, //NODEMAILER_PASSWORD
    },
};

const detail = {
    subject:'Email From BMS',
    text:`We were warm welcoming you in our Beneficiary Management System`,
}
export const sendEmail = async (mail,subject = detail.subject,text= detail.text )  => {
    const transporter =  nodemailer.createTransport(emailConfig);


    const mailOptions = {
        from: nodemailer_mail, // NODEMAILER_MAIL
        to: mail,
        subject: subject,
        text: text,
    };

    try {
        await transporter.sendMail(mailOptions);
        
        return `message is send on ${mail}`;
    } catch (error) {
        throw `Error sending OTP to ${mail} via email: ${error}`;
    }
}

