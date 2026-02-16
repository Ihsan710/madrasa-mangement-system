# 🕌 Madrasa Management System

![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![Stack](https://img.shields.io/badge/Stack-MERN-blue)
![License](https://img.shields.io/badge/License-MIT-green)

A comprehensive, role-based digital solution designed to streamline the administration of Madrasas and Mosques. This system facilitates efficient management of citizen records, family data, monthly fees, and improved communication between the administration and the community.

## ✨ Key Features

### 🏢 Admin Panel
- **Dashboard**: Real-time analytics, revenue charts, and demographic stats.
- **Citizen Management**: Add, view, update, and delete community members/families.
- **Fee Management**: Track monthly contributions, mark fees as Paid/Unpaid, and view payment history.
- **Search & Filter**: Powerful search across the citizen directory.

### 🏠 Citizen Portal
- **My Dashboard**: View personal contribution history and family summary.
- **Family Management**: Add and manage family members (spouse, children, etc.).
- **Transparent Records**: Access real-time fee payment status and history.
- **Profile**: Manage personal details and upload profile photos.

### 🌐 Public Access
- **Landing Page**: Beautiful, responsive home page with mosque details and gallery.
- **About & Contact**: Information about the institution and direct contact channels.

---

## 🛠️ Tech Stack

This project is built using the **MERN** stack with **Next.js** for a modern, performant frontend.

- **Frontend**: 
  - [Next.js 16](https://nextjs.org/) (React Framework)
  - [Tailwind CSS](https://tailwindcss.com/) (Styling)
  - [Framer Motion](https://www.framer.com/motion/) (Animations)
  - [React-Toastify](https://fkhadra.github.io/react-toastify/) (Notifications)
  - [Recharts](https://recharts.org/) (Data Visualization)

- **Backend**:
  - [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
  - [MongoDB](https://www.mongodb.com/) (Database)
  - [Mongoose](https://mongoosejs.com/) (ODM)
  - [JWT](https://jwt.io/) (Authentication)
  - [Bcrypt](https://www.npmjs.com/package/bcrypt) (Security)

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local or Atlas)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/madrasa-portal.git
cd madrasa-portal
```

### 2. Backend Setup
Navigate to the backend folder and install dependencies:
```bash
cd mosque-backend
npm install
```

Create a `.env` file in `mosque-backend/` with the following credentials:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_secret_key
# Optional: Cloudinary credentials for image upload
```

Start the backend server:
```bash
npm run server
# Server runs on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend folder, and install dependencies:
```bash
cd mosque-frontend
npm install
```

Create a `.env.local` file in `mosque-frontend/` with:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the development server:
```bash
npm run dev
# App runs on http://localhost:3000
```

---

## 📸 Screenshots

| Admin Dashboard | Citizen Portal |
|:---:|:---:|
| *(Add screenshots here)* | *(Add screenshots here)* |

| Landing Page | Mobile View |
|:---:|:---:|
| *(Add screenshots here)* | *(Add screenshots here)* |

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
