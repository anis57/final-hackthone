import dotenv from "dotenv";
import transporter from "../EmailSender/EmailSender.js";

dotenv.config();

const sendMailVerification = (email, url) => {
  transporter.sendMail({
    from: process.env.PORTAL_EMAIL,
    to: email,
    subject: "Reset Password Verification",
    html: `<p>Click the link below to reset your password:</p>
            <a href="${url}">Reset Password</a>`,
  });
  console.log(`Verification email sent to ${email}`);
};

export default sendMailVerification;
