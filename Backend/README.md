📚 Library Management System – Backend API (MERN)
📌 Project Overview

This project is a Library Management System backend API built using the MERN stack (MongoDB, Express.js, Node.js).
It provides secure, role-based REST APIs for managing books and users in a library environment.

The backend is fully tested using Postman, and all major APIs are working successfully.

🚀 Features

User Registration & Login

JWT-based Authentication

Role-based Authorization (ADMIN / USER)

Book Management (Add, View, Update, Delete)

Secure API access

MongoDB database integration

Clean MVC architecture

🛠️ Tech Stack

Backend: Node.js, Express.js

Database: MongoDB (MongoDB Compass)

Authentication: JWT (JSON Web Token)

Testing: Postman

Tools: Nodemon, dotenv

📂 Project Structure
Backend/
│
├── controllers/
│ ├── auth.controller.js
│ └── book.controller.js
│
├── models/
│ ├── User.js
│ └── Book.js
│
├── routes/
│ ├── auth.routes.js
│ └── book.routes.js
│
├── middleware/
│ ├── auth.js
│ └── role.js
│
├── config/
│ └── db.js
│
├── server.js
├── .env
└── package.json

🔐 Authentication & Authorization

JWT-based authentication

Tokens are passed using:

Authorization: Bearer <JWT_TOKEN>

ADMIN role is required for book management operations

USER role can view books only

📌 API Endpoints
🔑 Auth APIs
Method Endpoint Description
POST /api/auth/register Register user
POST /api/auth/login Login user
📚 Book APIs
Method Endpoint Access Description
POST /api/books/add ADMIN Add new book
GET /api/books USER View all books
PUT /api/books/update/:id ADMIN Update book
DELETE /api/books/delete/:id ADMIN Delete book
🧪 Testing

All APIs tested using Postman

Authentication & authorization verified

Error handling validated

JWT token verification tested successfully

⚙️ Environment Variables

Create a .env file in the Backend folder:

PORT=5000
MONGO_URI=mongodb://localhost:27017/libraryDB
JWT_SECRET=your_secret_key

▶️ How to Run the Project
npm install
npm run dev

Server will start at:

http://localhost:5000

📈 Future Enhancements

Frontend using React

Book issue/return system

Pagination & search

Swagger API documentation

👨‍💻 Author

SWAYAM PANDEY
Backend Developer (MERN Stack)
