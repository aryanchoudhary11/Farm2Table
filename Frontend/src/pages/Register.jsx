import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password != confirmPassword) {
      setError("Password did not matched!");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );
      setSuccess("Account created successfully! You can now login.");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("customer");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-green-100 px-4 mt-7">
      <div className="bg-white p-8 shadow-lg rounded-2xl w-full max-w-md">
        <h2 className="text-2xl text-center text-green-700 font-semibold mb-1">
          Create an Account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Join us to get fresh local produce!
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <div>
            <label className="block text-sm text-gray-700 mb-1 font-medium">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password.."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="mt-2">
            <label className="text-sm block font-medium text-gray-700 mb-1">
              Registering as:
            </label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="customer"
                  checked={role === "customer"}
                  onChange={() => setRole("customer")}
                  className="accent-green-600"
                />
                <span>👤Customer</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="farmer"
                  checked={role === "farmer"}
                  onChange={() => setRole("farmer")}
                  className="accent-green-600"
                />
                <span>👨‍🌾Farmer</span>
              </label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <input type="checkbox" required className="accent-green-600" />
              <span className="text-sm text-gray-600">
                I agree to the{" "}
                <Link to="/terms" className="text-green-600 underline">
                  Terms and conditions
                </Link>
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 cursor-pointer rounded-lg text-white py-2 mt-2 font-semibold hover:bg-green-700 transition-all"
            >
              Create Account
            </button>
          </div>
        </form>
        <div className="mt-6 text-center text-sm text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-medium hover:underline"
          >
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Register;
