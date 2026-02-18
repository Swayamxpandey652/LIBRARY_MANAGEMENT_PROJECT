const express = require("express");
const router = express.Router();

const { addBook } = require("../controllers/book.controller");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// Admin only
router.post("/add", auth, role("ADMIN"), addBook);

module.exports = router;
