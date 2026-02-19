import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BookAvailable({ books }) {
  const [search, setSearch] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!selectedBook) {
      alert("Please select a book before submitting.");
      return;
    }
    navigate("/book-issue", { state: { book: selectedBook } });
  };

  return (
    <div>
      <h2>Book Available</h2>
      <input
        type="text"
        placeholder="Search book"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Author</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {books
            .filter((b) => b.name.includes(search))
            .map((book) => (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>
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
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
}
