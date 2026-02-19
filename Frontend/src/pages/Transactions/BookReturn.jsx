import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import  BookContext  from "./../../context/BookContext.jsx";

export default function BookReturn() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { returnBook } = useContext(BookContext);

  const issueData = state?.issueData || {};

  const [form, setForm] = useState({
    bookName: issueData.bookName || "",
    author: issueData.author || "",
    serialNo: "",
    issueDate: issueData.issueDate || "",
    returnDate: issueData.returnDate || ""
  });
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (!form.bookName || !form.serialNo) return setError("Book Name and Serial No are required");
    
    setError("");
    returnBook(form);
    navigate("/fine-pay", { state: { returnData: form } });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Return Book</h2>

      <input type="text" readOnly value={form.bookName} placeholder="Book Name" className="w-full border p-2 rounded mb-2 bg-gray-100"/>
      <input type="text" readOnly value={form.author} placeholder="Author" className="w-full border p-2 rounded mb-2 bg-gray-100"/>
      <input type="text" value={form.serialNo} onChange={e => setForm({...form, serialNo: e.target.value})} placeholder="Serial No" className="w-full border p-2 rounded mb-2"/>
      <input type="date" value={form.issueDate} readOnly className="w-full border p-2 rounded mb-2 bg-gray-100"/>
      <input type="date" value={form.returnDate} onChange={e => setForm({...form, returnDate: e.target.value})} className="w-full border p-2 rounded mb-2"/>
      
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <button onClick={handleConfirm} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Confirm</button>
    </div>
  );
}
