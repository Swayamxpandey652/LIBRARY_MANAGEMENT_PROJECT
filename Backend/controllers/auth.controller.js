const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, username, password, role } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Check if username exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      username,
      password: hashedPassword,
      role: role?.toUpperCase() || "USER",
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    // Case-insensitive & trimmed username
    const user = await User.findOne({ username: new RegExp(`^${username.trim()}$`, "i") });
    if (!user) return res.status(400).json({ message: "Invalid username or password" });

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid username or password" });

    // JWT
    const token = jwt.sign(
      { id: user._id, role: user.role.toUpperCase() },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );

    res.status(200).json({ token, role: user.role.toUpperCase() });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
