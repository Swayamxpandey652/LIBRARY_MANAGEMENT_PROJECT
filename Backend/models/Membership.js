const mongoose = require("mongoose");


const MembershipSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  membershipNo: { type: String, unique: true },
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ["ACTIVE", "CANCELLED"], default: "ACTIVE" }
});

module.exports = mongoose.model("Membership", MembershipSchema);
