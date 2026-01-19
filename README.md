# 🛒 Multi Client Services Platform

A full-stack **service booking and cart management platform** where customers can browse services, add them to cart, book services, make secure online payments, and receive booking confirmation with receipts via email.

Built using **MERN Stack**.

---

## 🚀 Features

### 👤 Customer
- Browse services by category
- Search and sort services
- Add services to cart 🛒
- Book services instantly
- Secure online payment (Razorpay)
- Receive booking confirmation & receipt via email
- View cart with total price and checkout option

### 🧑‍💼 Merchant
- Add and manage services
- Set pricing, category, and availability

### 🔐 Authentication
- JWT-based secure authentication
- Role-based access (Customer / Merchant)

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios
- CSS
- Vite / CRA

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Razorpay Payment Gateway
- Nodemailer (Email Service)
- PDFKit / PDF generation utility

---

## 📂 Project Structure


## 📂 Project Structure
```
Multi Client Services/
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── api/
│ │ ├── styles/
│ │ └── utils/
│
├── backend/
│ ├── routes/
│ │ ├── authRoutes.js
│ │ ├── serviceRoutes.js
│ │ ├── cartRoutes.js
│ │ ├── bookingRoutes.js
│ │ └── paymentRoutes.js
│ │
│ ├── models/
│ │ ├── User.js
│ │ ├── Service.js
│ │ ├── Booking.js
│ │ └── Cart.js
│ │
│ ├── middleware/
│ │ └── authMiddleware.js
│ │
│ ├── utils/
│ │ ├── sendEmail.js
│ │ └── generateReceiptPDF.js
│ │
│ ├── server.js
│ └── .env
│
└── README.md
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

RAZORPAY_KEY=rzp_test_xxxxxxxxx
RAZORPAY_SECRET=xxxxxxxxxxxxxx

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

```

---

## ▶️ Installation & Setup
1️⃣ Clone Repository
```
git clone https://github.com/your-username/multi-client-services.git
cd multi-client-services
```
2️⃣ Backend Setup
```
cd backend
npm install
npm run dev
```

Backend runs on:
```
http://localhost:5000
```
3️⃣ Frontend Setup
```
cd frontend
npm install
npm start

```
Frontend runs on:
```
http://localhost:3000
```

---
