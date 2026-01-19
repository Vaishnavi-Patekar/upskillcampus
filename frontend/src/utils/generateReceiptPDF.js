import PDFDocument from "pdfkit";
import fs from "fs";

export const generateReceipt = (booking) => {
  return new Promise((resolve) => {
    const fileName = `receipt_${booking._id}.pdf`;
    const filePath = `./receipts/${fileName}`;

    const pdf = new PDFDocument();
    pdf.pipe(fs.createWriteStream(filePath));

    pdf.fontSize(22).text("Booking Receipt", { align: "center" });
    pdf.moveDown();

    pdf.fontSize(14).text(`Booking ID: ${booking._id}`);
    pdf.text(`Name: ${booking.customerName}`);
    pdf.text(`Service: ${booking.serviceId.title}`);
    pdf.text(`Price: ₹${booking.serviceId.price}`);
    pdf.text(`Payment ID: ${booking.paymentId}`);
    pdf.text(`Date: ${booking.date}`);
    pdf.text(`Time: ${booking.time}`);
    pdf.text(`Address: ${booking.address}`);
    
    pdf.end();

    resolve(filePath);
  });
};


export default generateReceipt;
