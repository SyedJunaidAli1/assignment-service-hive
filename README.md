# 🖥️ Service Hive – Frontend

Frontend for **Service Hive**, a gig marketplace where clients post gigs, freelancers bid on them, and clients hire one freelancer per gig.

This frontend is built to work with a secure backend using **HttpOnly cookies** for authentication.

---

## 🚀 Tech Stack

- **React (Vite)**  
- **TypeScript**  
- **Tailwind CSS**  
- **React Router DOM**  
- **Axios**

---

## ✨ Features

### 🔐 Authentication
- User Registration  
- User Login  
- Secure authentication using **HttpOnly cookies**  
- Protected routes for authenticated users  

### 💼 Gigs
- View all available gigs  
- View gig details  
- Create a new gig (authenticated users only)  

### 📝 Bidding
- Freelancers can place bids on gigs  
- Prevents duplicate bids  
- Prevents users from bidding on their own gigs  

### 🏆 Hiring
- Gig owners can view all bids on their gigs  
- Hire one freelancer  
- Automatically rejects other bids  
- Updates gig status to **assigned**

---

## 🗂️ Project Structure
```
src/
├── api/
│   └── axios.ts
├── components/
│   └── ProtectedRoute.tsx
├── pages/
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Gigs.tsx
│   ├── GigDetails.tsx
│   └── PostGig.tsx
├── App.tsx
├── main.tsx
└── index.css
```

---

## 🔐 Authentication Flow

1. Login and Register APIs set **HttpOnly JWT cookies**  
2. Axios is configured with `withCredentials: true`  
3. Frontend verifies authentication via a protected `/auth/me` endpoint  
4. Routes like `/gigs` and `/post-gig` are protected using a custom `ProtectedRoute` component

---

## 🌐 Environment Variables

Create a `.env` file in the frontend root:

```
VITE_API_URL=http://localhost:5000/api
```

## 📦 Installation & Setup
1️⃣ Install dependencies
bash
Copy
```
bun install
``` 
2️⃣ Start development server
bash
Copy
```
bun run dev
```
The app will run at:
👉 http://localhost:5173
