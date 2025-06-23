require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER,
  subject: "SMTP Test",
  text: "This is a test email.",
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("Email sent:", info.response);
  }
});
