const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");

const {
  addUser,
  updateUser
} = require("../controllers/user.controller");

router.post("/", auth, adminOnly, addUser);
router.put("/:id", auth, adminOnly, updateUser);

module.exports = router;
