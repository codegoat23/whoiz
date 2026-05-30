import nodemailer from 'nodemailer';


export const transporter = nodemailer.createTransport({
  host: process.env.MAILERSEND_SMTP_HOST,
  port: Number(process.env.MAILERSEND_SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.MAILERSEND_SMTP_USER,
    pass: process.env.MAILERSEND_SMTP_PASS,
  },
});
