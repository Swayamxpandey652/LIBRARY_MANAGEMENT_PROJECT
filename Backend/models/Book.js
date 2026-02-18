const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  type: { type: String, default: "BOOK" },
  serialNo: { type: String, required: true, unique: true },
  available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Book", BookSchema);
