import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500 mb-4">403</h1>
      <p className="text-xl mb-4">You are not authorized to access this page.</p>
      <button
        onClick={() => navigate("/login")}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Go to Login
      </button>
    </div>
  );
};

export default Unauthorized;
