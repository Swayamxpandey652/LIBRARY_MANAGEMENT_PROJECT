import React, { useState } from "react";
import axios from "../../utils/axiosInstance";

const AddMembership = () => {
  const [form, setForm] = useState({ name: "", duration: "6" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) {
      setError("Name is required");
      return;
    }
    try {
      await axios.post("/memberships", form);
      setSuccess("Membership added successfully");
      setForm({ name: "", duration: "6" });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error adding membership");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Add Membership</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        <input
          type="text"
          name="name"
          placeholder="Member Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 mb-4 w-full rounded"
        />

        <select
          name="duration"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          className="border p-2 mb-4 w-full rounded"
        >
          <option value="6">6 Months</option>
          <option value="12">1 Year</option>
          <option value="24">2 Years</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
        >
          Add Membership
        </button>
      </form>
    </div>
  );
};

export default AddMembership;
