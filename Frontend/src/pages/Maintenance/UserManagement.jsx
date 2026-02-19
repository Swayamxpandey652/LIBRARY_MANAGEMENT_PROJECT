import React, { useState } from "react";
import axios from "../../utils/axiosInstance";

const UserManagement = () => {
  const [option, setOption] = useState("new");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (option === "new" && !name) {
      setError("Name is mandatory for new users");
      return;
    }
    try {
      if (option === "new") await axios.post("/users", { name });
      else await axios.get("/users"); // existing users - fetch
      setSuccess("Action completed successfully");
      setError("");
      setName("");
    } catch (err) {
      setError(err.response?.data?.message || "Error managing user");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">User Management</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        <select
          value={option}
          onChange={(e) => setOption(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
        >
          <option value="new">New User</option>
          <option value="existing">Existing User</option>
        </select>

        {option === "new" && (
          <input
            type="text"
            placeholder="User Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 mb-4 w-full rounded"
          />
        )}

        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserManagement;
