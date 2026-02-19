import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { jwtDecode } from "jwt-decode"; // ✅ default import
import BookContext  from "../context/BookContext.jsx"; // ✅ correct path

const Login = () => {
  const navigate = useNavigate();
  const { setUserRole } = useContext(BookContext);

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prev) => ({
    ...prev,
    [name]: value.trimStart(), // remove leading spaces
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  const { username, password } = form;

  if (!username || !password) {
    setError("Username and password are required");
    return;
  }

  try {
    const res = await axios.post("/auth/login", { username, password });
    const token = res.data.token;

    if (!token) {
      setError("Login failed: No token returned");
      return;
    }

    localStorage.setItem("token", token);

    // Decode JWT
    const decoded = jwtDecode(token);
    const role = decoded.role?.toUpperCase() || "USER";

    // Set role in context
    setUserRole(role === "ADMIN" ? "admin" : "user");

    // ✅ Navigate immediately based on role
    if (role === "ADMIN") {
      navigate("/maintenance", { replace: true });
    } else {
      navigate("/book-search", { replace: true });
    }

  } catch (err) {
    console.error(err.response?.data || err.message);
    setError(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="border p-2 mb-4 w-full rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 mb-4 w-full rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;