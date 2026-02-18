const express = require("express");
const router = express.Router();
const {
  searchBooks,
  issueBook,
  returnBook
} = require("../controllers/transaction.controller");

const auth = require("../middleware/auth");

router.get("/search", auth, searchBooks);

router.post("/issue", auth, issueBook);

router.post("/return", auth, returnBook);


module.exports = router;
