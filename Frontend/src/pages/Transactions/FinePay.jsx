import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function FinePay() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const returnData = state?.returnData || {};

  // Derived fine amount directly from issue/return dates
  let fineAmount = 0;
  if (returnData.issueDate && returnData.returnDate) {
    const issueDate = new Date(returnData.issueDate);
    const returnDate = new Date(returnData.returnDate);
    const diff = (returnDate - issueDate) / (1000 * 60 * 60 * 24); // days
    fineAmount = diff > 15 ? (diff - 15) * 5 : 0; // ₹5 per day after 15
  }

  const [finePaid, setFinePaid] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (fineAmount > 0 && !finePaid) {
      setError("Please mark the fine as paid before completing the return.");
      return;
    }
    setError("");
    alert("Transaction completed successfully!");
    navigate("/book-search"); // redirect to main transactions
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded mt-6">
      <h2 className="text-2xl font-bold mb-4">Fine Payment</h2>

      <div className="space-y-3">
        <input
          type="text"
          value={returnData.bookName || ""}
          readOnly
          placeholder="Book Name"
          className="w-full border p-2 rounded bg-gray-100"
        />
        <input
          type="text"
          value={returnData.author || ""}
          readOnly
          placeholder="Author"
          className="w-full border p-2 rounded bg-gray-100"
        />
        <input
          type="text"
          value={returnData.serialNo || ""}
          readOnly
          placeholder="Serial No"
          className="w-full border p-2 rounded bg-gray-100"
        />
        <input
          type="date"
          value={returnData.issueDate || ""}
          readOnly
          className="w-full border p-2 rounded bg-gray-100"
        />
        <input
          type="date"
          value={returnData.returnDate || ""}
          readOnly
          className="w-full border p-2 rounded bg-gray-100"
        />
        <input
          type="number"
          value={fineAmount}
          readOnly
          placeholder="Fine Amount"
          className="w-full border p-2 rounded bg-gray-100"
        />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={finePaid}
            onChange={() => setFinePaid(!finePaid)}
            id="finePaid"
          />
          <label htmlFor="finePaid">Fine Paid</label>
        </div>

        <input
          type="text"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Remarks"
          className="w-full border p-2 rounded"
        />

        {error && <p className="text-red-600 font-medium">{error}</p>}

        <button
          onClick={handleConfirm}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
