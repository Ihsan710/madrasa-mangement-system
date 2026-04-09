# Architecture Overview

The Madrasa Management System uses a decoupled **MERN + Next.js** architecture to provide a seamless, performant experience.

## Frontend (Client Layer)
- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS & Framer Motion
- **Role:** Handles routing, UI state, animations, and communicates with the backend via REST APIs.

## Backend (API Layer)
- **Framework:** Node.js with Express.js
- **Auth:** JWT (JSON Web Tokens) & bcrypt
- **Role:** Exposes RESTful endpoints, handles business logic, and manages secure authentication for both Admins and Citizens.

## Database (Data Layer)
- **Database:** MongoDB
- **ODM:** Mongoose
- **Role:** Persists all student, teacher, and schedule data securely in the cloud.
