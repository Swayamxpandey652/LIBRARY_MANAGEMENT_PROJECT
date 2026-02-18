const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");

const {
  addBook,
  updateBook,
  deleteBook,
  getBooks
} = require("../controllers/book.controller");

// ADMIN
router.post("/", auth, adminOnly, addBook);
router.put("/:id", auth, adminOnly, updateBook);
router.delete("/:id", auth, adminOnly, deleteBook);

// USER / ADMIN
router.get("/", auth, getBooks);

module.exports = router;
