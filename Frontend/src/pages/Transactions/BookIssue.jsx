import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import  BookContext  from "./../../context/BookContext.jsx";

export default function BookIssue() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { issueBook } = useContext(BookContext);
  const selectedBook = state?.book || {};

  const today = new Date();
  const defaultReturn = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000);

  const [form, setForm] = useState({
    bookName: selectedBook.name || "",
    author: selectedBook.author || "",
    issueDate: today.toISOString().split("T")[0],
    returnDate: defaultReturn.toISOString().split("T")[0],
    remarks: ""
  });
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!form.bookName) return setError("Book Name is required");
    if (new Date(form.issueDate) < today) return setError("Issue date cannot be earlier than today");
    const maxReturn = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000);
    if (new Date(form.returnDate) > maxReturn) return setError("Return date cannot exceed 15 days");
    
    setError("");
    issueBook(form);
    navigate("/book-return", { state: { issueData: form } });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Book Issue</h2>

      <input type="text" readOnly value={form.bookName} placeholder="Book Name" className="w-full border p-2 rounded mb-2 bg-gray-100"/>
      <input type="text" readOnly value={form.author} placeholder="Author" className="w-full border p-2 rounded mb-2 bg-gray-100"/>
      <label>Issue Date</label>
      <input type="date" value={form.issueDate} onChange={e => setForm({...form, issueDate: e.target.value})} className="w-full border p-2 rounded mb-2"/>
      <label>Return Date</label>
      <input type="date" value={form.returnDate} onChange={e => setForm({...form, returnDate: e.target.value})} className="w-full border p-2 rounded mb-2"/>
      <input type="text" value={form.remarks} onChange={e => setForm({...form, remarks: e.target.value})} placeholder="Remarks" className="w-full border p-2 rounded mb-2"/>
      
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Next</button>
    </div>
  );
}
