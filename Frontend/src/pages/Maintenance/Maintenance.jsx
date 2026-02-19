import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BookContext from "../../context/BookContext"; // default import

const Maintenance = () => {
  const { userRole } = useContext(BookContext);
  const navigate = useNavigate();

  if (userRole !== "admin") {
    return <p className="text-red-600 text-center mt-10">Access denied. Admin only.</p>;
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Maintenance Module (Admin Only)</h1>
      <p className="mb-6">
        Add, Update Books, Manage Memberships, and User Management.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => navigate("/add-book")}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add / Update Book
        </button>

        <button
          onClick={() => navigate("/add-membership")}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Add / Update Membership
        </button>

        <button
          onClick={() => navigate("/user-management")}
          className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700"
        >
          User Management
        </button>
      </div>
    </div>
  );
};

export default Maintenance;
