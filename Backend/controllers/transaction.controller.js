const Book = require("../models/Book");
const Issue = require("../models/Issue");

exports.searchBooks = async (req, res) => {
  // Rule: at least one filter required
  if (!Object.keys(req.query).length) {
    return res.status(400).json({
      message: "Select at least one search field"
    });
  }

  const books = await Book.find({
    ...req.query,
    available: true
  });

  res.json(books);
};

exports.issueBook = async (req, res) => {
  const { bookId, userId, returnDate } = req.body;

  const issueDate = new Date();
  const maxReturnDate = new Date();
  maxReturnDate.setDate(issueDate.getDate() + 15);

  // Excel rule: return date ≤ 15 days
  if (new Date(returnDate) > maxReturnDate) {
    return res
      .status(400)
      .json({ message: "Return date cannot exceed 15 days" });
  }

  await Book.findByIdAndUpdate(bookId, { available: false });

  const issue = await Issue.create({
    bookId,
    userId,
    issueDate,
    dueDate: returnDate
  });

  res.json(issue);
};

exports.returnBook = async (req, res) => {
  const { issueId } = req.body;
  const issue = await Issue.findById(issueId);

  const today = new Date();
  let fine = 0;

  // ₹10/day late fine
  if (today > issue.dueDate) {
    const daysLate = Math.ceil(
      (today - issue.dueDate) / (1000 * 60 * 60 * 24)
    );
    fine = daysLate * 10;
  }

  issue.returnDate = today;
  issue.fine = fine;
  await issue.save();

  res.json(issue);
};

