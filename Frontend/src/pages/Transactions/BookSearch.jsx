import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BookContext from "../../context/BookContext"; // default import

export default function BookSearch() {
  const { books } = useContext(BookContext);
  const [search, setSearch] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (!selectedBook) {
      setError("Please select a book before proceeding.");
      return;
    }
    setError("");
    navigate("/book-issue", { state: { book: selectedBook } });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Book Search</h2>
      <input
        type="text"
        placeholder="Search by book name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />
      <table className="table-auto w-full border mb-4">
        <thead>
          <tr>
            <th className="border px-2 py-1">Book Name</th>
            <th className="border px-2 py-1">Author</th>
            <th className="border px-2 py-1">Select</th>
          </tr>
        </thead>
        <tbody>
          {books
            .filter((b) => b.name.toLowerCase().includes(search.toLowerCase()))
            .map((book) => (
              <tr key={book.id}>
                <td className="border px-2 py-1">{book.name}</td>
                <td className="border px-2 py-1">{book.author}</td>
                <td className="border px-2 py-1 text-center">
                  <input
                    type="radio"
                    name="selectedBook"
                    checked={selectedBook?.id === book.id}
                    onChange={() => setSelectedBook(book)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <button
        onClick={handleNext}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  );
}
