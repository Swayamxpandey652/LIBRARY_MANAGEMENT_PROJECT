import React, { useState } from "react";
import axios from "../../utils/axiosInstance";

const UpdateMembership = () => {
  const [membershipNo, setMembershipNo] = useState("");
  const [member, setMember] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchMember = async () => {
    if (!membershipNo) {
      setError("Membership Number required");
      return;
    }
    try {
      const res = await axios.get(`/memberships/${membershipNo}`);
      setMember(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Member not found");
      setMember(null);
    }
  };

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!member.name || !member.duration) {
      setError("All fields required");
      return;
    }
    try {
      await axios.put(`/memberships/${membershipNo}`, member);
      setSuccess("Membership updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Error updating membership");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Update Membership</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        <input
          type="text"
          placeholder="Membership Number"
          value={membershipNo}
          onChange={(e) => setMembershipNo(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
        />
        <button
          onClick={fetchMember}
          className="bg-blue-600 text-white w-full py-2 rounded mb-4 hover:bg-blue-700"
        >
          Fetch Member
        </button>

        {member && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Member Name"
              value={member.name}
              onChange={handleChange}
              className="border p-2 mb-4 w-full rounded"
            />
            <select
              name="duration"
              value={member.duration}
              onChange={handleChange}
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
              Update Membership
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateMembership;
