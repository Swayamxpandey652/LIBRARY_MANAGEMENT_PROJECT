const express = require("express");
const router = express.Router();

const { addMembership } = require("../controllers/membership.controller");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// Add Membership (Admin only)

router.post("/add", auth, role("ADMIN"), addMembership);

module.exports = router;
