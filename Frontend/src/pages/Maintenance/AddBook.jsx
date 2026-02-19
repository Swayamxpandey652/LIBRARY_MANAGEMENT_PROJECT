import { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "Fiction",
    isbn: "",
    availableCopies: 1
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!form.title) err.title = "Title is required";
    if (!form.author) err.author = "Author is required";
    if (!form.isbn) err.isbn = "ISBN is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("/api/books", form); // connect to backend API
      alert("Book added successfully!");
      setForm({ title: "", author: "", category: "Fiction", isbn: "", availableCopies: 1 });
    } catch (error) {
      console.error(error);
      alert("Error adding book");
    }
  };

  return (
    <form className="p-6 max-w-md mx-auto space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
        className="w-full p-2 border rounded"
      />
      {errors.title && <p className="text-red-500">{errors.title}</p>}

      <input
        type="text"
        placeholder="Author"
        value={form.author}
        onChange={e => setForm({ ...form, author: e.target.value })}
        className="w-full p-2 border rounded"
      />
      {errors.author && <p className="text-red-500">{errors.author}</p>}

      <select
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
        className="w-full p-2 border rounded"
      >
        <option>Fiction</option>
        <option>Non-Fiction</option>
        <option>Science</option>
      </select>

      <input
        type="text"
        placeholder="ISBN"
        value={form.isbn}
        onChange={e => setForm({ ...form, isbn: e.target.value })}
        className="w-full p-2 border rounded"
      />
      {errors.isbn && <p className="text-red-500">{errors.isbn}</p>}

      <input
        type="number"
        min={1}
        value={form.availableCopies}
        onChange={e => setForm({ ...form, availableCopies: +e.target.value })}
        className="w-full p-2 border rounded"
      />

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Add Book
      </button>
    </form>
  );
};

export default AddBook;
