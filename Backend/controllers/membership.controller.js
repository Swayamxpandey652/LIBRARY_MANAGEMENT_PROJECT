const Membership = require("../models/Membership");

const addMonths = (months) => {
  let d = new Date();
  d.setMonth(d.getMonth() + months);
  return d;
};

exports.addMembership = async (req, res) => {
  const { userId, duration } = req.body;

  const membership = await Membership.create({
    userId,
    membershipNo: "MEM" + Date.now(),
    startDate: new Date(),
    endDate: addMonths(duration || 6) // default 6 months
  });

  res.json(membership);
};

exports.updateMembership = async (req, res) => {
  const { membershipNo, action, extendMonths } = req.body;

  if (!membershipNo)
    return res.status(400).json({ message: "Membership number required" });

  const membership = await Membership.findOne({ membershipNo });
  if (!membership)
    return res.status(404).json({ message: "Membership not found" });

  if (action === "CANCEL") {
    membership.status = "CANCELLED";
  } else {
    const months = extendMonths || 6;
    membership.endDate = addMonths(months);
  }

  await membership.save();
  res.json(membership);
};

