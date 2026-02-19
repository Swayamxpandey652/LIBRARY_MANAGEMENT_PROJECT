import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Safe setState to avoid React 18 Strict Mode warnings
    const timer = setTimeout(() => {
      try {
        const decoded = jwtDecode(token);
        setUser({
          id: decoded.id || "",
          email: decoded.email || "",
          role: decoded.role || "USER",
          token,
        });
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
        setUser(null);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      setUser({
        id: decoded.id || "",
        email: decoded.email || "",
        role: decoded.role || "USER",
        token,
      });
      localStorage.setItem("token", token);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
