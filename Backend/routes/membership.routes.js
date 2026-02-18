const express = require("express");
const router = express.Router();

const { addMembership , updateMembership } = require("../controllers/membership.controller");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const adminOnly = require("../middleware/adminOnly");

// Add Membership (Admin only)

router.post("/add", auth, role("ADMIN"), addMembership);

router.put("/update", auth, adminOnly, updateMembership);


module.exports = router;
