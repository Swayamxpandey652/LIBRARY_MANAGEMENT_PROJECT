const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ADD USER (ADMIN)
exports.addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "USER"
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE USER (ADMIN)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, active } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name required" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { name, role, active },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
