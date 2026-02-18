const Book = require("../models/Book");

// ADD BOOK
exports.addBook = async (req, res) => {
  try {
    const { title, author, type, serialNo } = req.body;

    if (!title || !author || !serialNo) {
      return res.status(400).json({ message: "All fields required" });
    }

    const book = await Book.create({
      title,
      author,
      type: type || "BOOK",
      serialNo
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL BOOKS
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE BOOK
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, type, serialNo, available } = req.body;

    if (!title || !author || !serialNo) {
      return res.status(400).json({ message: "All fields required" });
    }

    const book = await Book.findByIdAndUpdate(
      id,
      {
        title,
        author,
        type: type || "BOOK",
        serialNo,
        available
      },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE BOOK
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
