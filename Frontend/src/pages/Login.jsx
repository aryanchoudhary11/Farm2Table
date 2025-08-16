import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api.js";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await API.post("/login", formData);

      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);

      if (data.role === "farmer") {
        navigate("/farmer");
      } else {
        navigate("/products");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-1">
          Login
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">Welcome Back!</p>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-smfont-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email..."
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>
          <div>
            <label className="block text-smfont-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password..."
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-green-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg font-semibold bg-green-600 text-white py-2 cursor-pointer hover:bg-green-700 transition-all"
          >
            {loading ? "Logging in..." : "🔐 Login"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-700">
          Don't have account?{" "}
          <Link
            to="/register"
            className="text-green-600 font-medium hover:underline"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
