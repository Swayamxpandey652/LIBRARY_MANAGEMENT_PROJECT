import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as jwtDecode from "jwt-decode";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let role = "";

  if (token) {
    try {
      const decoded = jwtDecode.default(token);
      role = decoded.role;
    } catch {
      // invalid token, ignore
      role = "";
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Library Management System</h1>
      <nav className="space-x-4">
        <Link to="/flowchart" className="hover:underline">
          Flow Chart
        </Link>

        {role === "admin" && (
          <>
            <Link to="/maintenance" className="hover:underline">
              Maintenance
            </Link>
            <Link to="/transactions" className="hover:underline">
              Transactions
            </Link>
          </>
        )}

        {role === "user" && (
          <Link to="/transactions" className="hover:underline">
            Transactions
          </Link>
        )}

        {token ? (
          <button
            onClick={handleLogout}
            className="ml-2 bg-red-500 px-2 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="ml-2 bg-green-500 px-2 py-1 rounded">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
