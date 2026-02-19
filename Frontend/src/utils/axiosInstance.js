import axios from "axios";

// Replace 5000 with your backend port
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
