import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { BookProvider } from "./context/BookProvider";

// Maintenance pages
import Maintenance from "./pages/Maintenance/Maintenance";
import AddBook from "./pages/Maintenance/AddBook";
import UpdateBook from "./pages/Maintenance/UpdateBook";
import AddMembership from "./pages/Maintenance/AddMembership";
import UpdateMembership from "./pages/Maintenance/UpdateMembership";
import UserManagement from "./pages/Maintenance/UserManagement";

// Transactions pages
import BookAvailable from "./pages/Transactions/BookAvailable";
import BookIssue from "./pages/Transactions/BookIssue";
import ReturnBook from "./pages/Transactions/BookReturn";
import FinePay from "./pages/Transactions/FinePay";
import BookSearch from "./pages/Transactions/BookSearch";

// Public pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import FlowChart from "./pages/FlowChart";

function App() {
  return (
    <BookProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/flowchart" element={<FlowChart />} />

          {/* Admin routes */}
          <Route
            path="/maintenance"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Maintenance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-book"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AddBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-book"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <UpdateBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-membership"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AddMembership />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-membership"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <UpdateMembership />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-management"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <UserManagement />
              </ProtectedRoute>
            }
          />

          {/* User routes */}
          <Route
            path="/book-search"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <BookSearch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-available"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <BookAvailable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-issue"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <BookIssue />
              </ProtectedRoute>
            }
          />
          <Route
            path="/return-book"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <ReturnBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fine-pay"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <FinePay />
              </ProtectedRoute>
            }
          />

          {/* fallback */}
          <Route path="*" element={<p className="text-center mt-10">Page Not Found</p>} />
        </Routes>
      </Router>
    </BookProvider>
  );
}

export default App;
