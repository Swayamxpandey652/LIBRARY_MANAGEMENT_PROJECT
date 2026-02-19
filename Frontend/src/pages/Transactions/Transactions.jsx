import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { BookProvider, BookContext } from "./BookContext";
import BookSearch from "./BookSearch";
import BookIssue from "./BookIssue";
import BookReturn from "./BookReturn";
import FinePay from "./FinePay";
import { useContext } from "react";

function Navigation() {
  const { userRole } = useContext(BookContext);

  return (
    <nav className="bg-blue-600 text-white p-4 flex space-x-4">
      {userRole === "admin" && <Link to="/maintenance">Maintenance</Link>}
      <Link to="/reports">Reports</Link>
      <Link to="/book-search">Transactions</Link>
    </nav>
  );
}

export default function Transaction() {
  return (
    <BookProvider>
      <Router>
        <Navigation />
        <div className="p-4">
          <Routes>
            <Route path="/book-search" element={<BookSearch />} />
            <Route path="/book-issue" element={<BookIssue />} />
            <Route path="/book-return" element={<BookReturn />} />
            <Route path="/fine-pay" element={<FinePay />} />
            <Route path="/maintenance" element={<div>Maintenance Page</div>} />
            <Route path="/reports" element={<div>Reports Page</div>} />
          </Routes>
        </div>
      </Router>
    </BookProvider>
  );
}
