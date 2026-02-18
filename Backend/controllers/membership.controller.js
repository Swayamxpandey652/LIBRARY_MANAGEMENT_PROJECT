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
