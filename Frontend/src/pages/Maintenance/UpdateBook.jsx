import React, { useState } from "react";
import axios from "../../utils/axiosInstance";

const UpdateBook = () => {
  const [serialNo, setSerialNo] = useState("");
  const [bookData, setBookData] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchBook = async () => {
    if (!serialNo) {
      setError("Serial Number is required");
      return;
    }
    try {
      const res = await axios.get(`/books/${serialNo}`);
      setBookData(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Book not found");
      setBookData(null);
    }
  };

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookData.title || !bookData.author || !bookData.type) {
      setError("All fields are mandatory");
      return;
    }
    try {
      await axios.put(`/books/${serialNo}`, bookData);
      setSuccess("Book updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Error updating book");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Update Book / Movie</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        <input
          type="text"
          placeholder="Enter Serial Number"
          value={serialNo}
          onChange={(e) => setSerialNo(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
        />
        <button
          onClick={fetchBook}
          className="bg-blue-600 text-white w-full py-2 rounded mb-4 hover:bg-blue-700"
        >
          Fetch Book
        </button>

        {bookData && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={bookData.title}
              onChange={handleChange}
              className="border p-2 mb-4 w-full rounded"
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={bookData.author}
              onChange={handleChange}
              className="border p-2 mb-4 w-full rounded"
            />
            <select
              name="type"
              value={bookData.type}
              onChange={handleChange}
              className="border p-2 mb-4 w-full rounded"
            >
              <option value="book">Book</option>
              <option value="movie">Movie</option>
            </select>

            <button
              type="submit"
              className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
            >
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateBook;
