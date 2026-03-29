# Full-Stack Todo Dashboard

A modern, responsive, full-stack web application built with a React frontend and a Node.js/Express backend. It features JWT-based authentication, user registration, and a dynamic task dashboard stylized with a premium glassmorphic UI.

---

## 🚀 Features

- **Secure Authentication:** User registration and login utilizing JWT (JSON Web Tokens) and bcrypt password hashing.
- **Task Management (CRUD):** 
  - Create new tasks with an associated description.
  - Delete completed or unwanted tasks.
  - View a personalized dashboard of your tasks securely fetched from the database.
- **Modern UI Edge:** A striking dark mode, glassmorphism frontend constructed with Vite and React.
- **State Management:** Fully reactive component rendering connected to dynamic backend data fetching.

---

## 💻 Technology Stack

### Frontend
- **Framework:** React 18, utilizing Hooks (`useState`, `useEffect`).
- **Build Tool:** Vite for instantaneous hot-module replacement and optimized builds.
- **Styling:** Custom Vanilla CSS with responsive design principles, CSS Variables, and Glassmorphism techniques.

### Backend
- **Core Server:** Node.js with Express.js backend.
- **Database:** MongoDB paired with Mongoose object modeling.
- **Authentication:** `jsonwebtoken` for stateless auth transmission, `bcryptjs` for security.
- **Middleware:** Custom JWT verification middleware and CORS handling.

---

## 🛠️ Installation & Setup

### Prerequisites

Ensure you have the following installed on your local machine:
- Node.js (v16+ recommended)
- A MongoDB URI connection string

### 1. Clone the repository
```bash
git clone <repository-url>
cd Backend_primetech
```

### 2. Backend Setup
Navigate to the `backend` directory, install dependencies, and setup your `.env` file.

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` root and configure the following variables:
```env
# backend/.env 
PORT=3000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0...
JWT_SECRET=your_super_secret_jwt_string
```

Start the backend server:
```bash
npm run dev
# Server should now be running on http://localhost:3000
```

### 3. Frontend Setup
In a new terminal, navigate to the `frontend` directory and start Vite.

```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
# Frontend should now be running on http://localhost:5173
```

---

## 📖 API Documentation

The backend exposes several routes securely separated under `/api`. 
*(Note: Protected routes require a Bearer token in the `Authorization` header)*

### Authentication Endpoints (`/api/auth`)
- `POST /register`: Register a new user (`name`, `email`, `password`, `role`).
- `POST /login`: Authenticate and receive a JWT (`email`, `password`).

### User Endpoints (`/api/user`)
- `GET /current`: Fetch the currently logged-in user's profile (Protected).

### Todo Endpoints (`/api/todo`)
- `POST /addTodo`: Create a new task (Protected).
- `GET /getTodos`: Retrieve all tasks authored by the logged-in user (Protected).
- `DELETE /deleteTodo/:id`: Remove a specific task (Protected).

---

## 🎨 Frontend Design Overview

The App leverages modern CSS to achieve its *vibrant dark-mode glass* aesthetic without relying on external heavy styling libraries. It includes:
- **`var(--bg-gradient)`:** A deep indigo/slate background matrix.
- **`.glass-panel`:** A class combining an opacity backdrop-filter, microscopic borders, and distinct shadows corresponding to floating, ethereal dashboard elements.
- **CSS Animations:** Smooth fade-ins and scale transitions for interactions (e.g., hovering tasks or buttons).

---
*Created and maintained as a demonstration of responsive full-stack bridging and efficient React/Express architecture.*