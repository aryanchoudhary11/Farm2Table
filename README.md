# 🌱 Farm2Table – Full Stack hyperlocal farmer-to-customer marketplace  

Farm2Table is a **full-stack MERN application** that connects local farmers directly with customers. It enables farmers to list their fresh produce and manage orders, while customers can browse products, place orders, and pay securely through **Stripe or COD**.

---

## 🚀 Features

### 👨‍🌾 Farmer Dashboard
- Farmer registration & login  
- Add new products with stock & price  
- Manage inventory (edit/delete products)  
- Track customer orders in real-time  
- Low stock alerts  

### 🛒 Customer Dashboard
- User registration & login  
- Browse & search products (real-time availability)  
- Add to cart & checkout  
- Place orders with **COD orStripe Payment Gateway** (test mode) 
- Track order status live   

### ⚡ Core Functionalities
- Authentication & Authorization (JWT)  
- Cart system with dynamic pricing  
- Minimum order restrictions & delivery charges  
- Secure online payments (Stripe)  
- Order history & live updates  
- Stock deduction on successful order 

---

## 🏗️ Tech Stack

**Frontend:** React, TailwindCSS, Axios  
**Backend:** Node.js, Express.js, JWT Auth  
**Database:** MongoDB with Mongoose  
**Payments:** Stripe (Test Mode)  
**Other Tools:** Framer Motion, Lucide Icons, bcrypt  

---
## ⚙️ Setup & Installation

1️⃣ Clone Repository

```
git clone https://github.com/aryanchoudhary11/Farm2Table.git
cd Farm2Table
```

2️⃣ Setup Backend

```
cd server
npm install
```

Create .env file inside server/:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
```

Start backend:

```
npm run dev
```

3️⃣ Setup Frontend

```
cd client
npm install
npm run dev
```

💳 Stripe Test Payment

Use the following test card for payment:
```
Card Number: 4242 4242 4242 4242
Expiry Date: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

### Link:- https://farm2table-by-aryan-choudhary.netlify.app
