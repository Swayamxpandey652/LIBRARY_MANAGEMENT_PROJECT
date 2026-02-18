const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true },
  password: { type: String },
  role: { type: String, enum: ["ADMIN", "USER"], default: "USER" }
});

module.exports = mongoose.model("User", UserSchema);
