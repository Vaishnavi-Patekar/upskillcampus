import nodemailer from "nodemailer";

export const sendEmail = async (email, pdfPath) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    }
  });

  await transporter.sendMail({
    from: "Service Booking <no-reply@service.com>",
    to: email,
    subject: "Booking Confirmation & Receipt",
    text: "Your booking is confirmed. Receipt attached.",
    attachments: [
      {
        filename: "receipt.pdf",
        path: pdfPath,
      },
    ],
  });
};


export default sendEmail;
