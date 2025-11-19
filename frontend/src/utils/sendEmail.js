import nodemailer from "nodemailer";

export default async function sendEmail(to, subject, text, attachmentPath) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "YOUR_EMAIL@gmail.com",
      pass: "YOUR_APP_PASSWORD",
    },
  });

  await transporter.sendMail({
    from: "ServiceHub <YOUR_EMAIL@gmail.com>",
    to,
    subject,
    text,
    attachments: [{ path: attachmentPath }],
  });
}
