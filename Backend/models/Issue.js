const mongoose = require("mongoose");


const IssueSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  issueDate: Date,
  dueDate: Date,
  returnDate: Date,
  fine: { type: Number, default: 0 },
  finePaid: { type: Boolean, default: false }
});

module.exports = mongoose.model("Issue", IssueSchema);
