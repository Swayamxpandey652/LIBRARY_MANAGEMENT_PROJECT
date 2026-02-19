const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/auth.controller");

// Login route
router.post("/login", login);

// Register route with duplicate username check
router.post("/register", async (req, res, next) => {
  try {
    // Call your controller
    await register(req, res);
  } catch (err) {
    // Handle MongoDB duplicate key error
    if (err.code === 11000 && err.keyPattern?.username) {
      return res.status(400).json({ message: "Username already exists" });
    }
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
