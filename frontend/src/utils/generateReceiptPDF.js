import PDFDocument from "pdfkit";
import fs from "fs";

export default function generateReceiptPDF(booking) {
  return new Promise((resolve) => {
    const path = `receipts/receipt_${booking._id}.pdf`;

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(path));

    doc.fontSize(20).text("ServiceHub - Booking Receipt");
    doc.text(`Booking ID: ${booking._id}`);
    doc.text(`Customer: ${booking.customerName}`);
    doc.text(`Service: ${booking.service.title}`);
    doc.text(`Amount Paid: ₹${booking.service.price}`);
    doc.text(`Payment ID: ${booking.paymentId}`);
    doc.text(`Date: ${booking.date}`);

    doc.end();

    resolve(path);
  });
}
