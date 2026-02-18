const Book = require("../models/Book");

exports.addBook = async (req, res) => {
  const { title, author, type, serialNo } = req.body;

  // Validation: all fields mandatory
  if (!title || !author || !serialNo) {
    return res.status(400).json({ message: "All fields required" });
  }

  // Default type = BOOK (handled by model)
  const book = await Book.create({
    title,
    author,
    type,
    serialNo
  });

  res.json(book);
};
