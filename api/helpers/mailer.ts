import nodemailer from "nodemailer";
import { IUser } from "../models/userModel";

//Sending email sample with Gmail
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "tutorialayenko@gmail.com",
    pass: "crxr esnf wuwr lojy",
  },
});

const sendWelcomeNotification = (user: IUser) => {
  transporter.sendMail({
    to: user.email,
    from: "tutorialayenko@gmail.com",
    subject: "Welcome Notification",
    html: `
        <p>We are thrilled to welcome you to School Link Application</p>
        <p>Thank you for choosing School Link App to management your school.'</p>
        `,
  });
};

const sendResetPasswordNotification = (email: string, token: any) => {
  transporter.sendMail({
    to: email,
    from: "tutorialayenko@gmail.com",
    subject: "Reset Password Notification",
    html: `
          <p>You are receiving this email because we received a password reset request for your account</p>
          <p>Your password reset token is ${token}. It expires in 60 minutes.</p>
          <p>If you did not request a password reset, no further action is required.'</p>
          `,
  });
};

const sendVerificationNotification = (email: string, token: any) => {
  transporter.sendMail({
    to: email,
    from: "tutorialayenko@gmail.com",
    subject: "Verification Notification",
    html: `
          <p>You are receiving this email because we received a verification request for your account</p>
          <p>Your verification token is ${token}. It expires in 60 minutes.</p>
          <p>If you did not request for a token, no further action is required.'</p>
          `,
  });
};

export {
  sendResetPasswordNotification,
  sendWelcomeNotification,
  sendVerificationNotification,
};
