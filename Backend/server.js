const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const bookRoutes = require("./routes/book.routes");
const membershipRoutes = require("./routes/membership.routes");
const transactionRoutes = require("./routes/transaction.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/memberships", membershipRoutes);
app.use("/api/transactions", transactionRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("Library Management System API is running");
});

// Server + DB 
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server running")
    );
  })
  .catch(err => console.error(err));
