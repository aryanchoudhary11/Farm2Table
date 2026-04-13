import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Tractor } from "lucide-react";
import API from "../api";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await API.post("/api/auth/register", { name, email, password, role });
      setSuccess("Account created! You can now log in.");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("customer");
      setAgreed(false);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    {
      value: "customer",
      label: "Customer",
      description: "Buy fresh produce",
      Icon: User,
    },
    {
      value: "farmer",
      label: "Farmer",
      description: "Sell your harvest",
      Icon: Tractor,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex mt-10">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-green-950 flex-col justify-between p-20">
        <div className="mt-8">
          <p className="text-green-300 text-xs font-semibold tracking-widest uppercase mb-4">
            Join the community
          </p>
          <h2 className="text-4xl font-bold text-white leading-snug mb-6">
            Grow together,
            <br />
            <span className="text-green-400">eat better.</span>
          </h2>
          <p className="text-green-300 text-sm leading-relaxed max-w-sm">
            Whether you grow food or love eating it — Farm2Table is the
            marketplace that brings you closer to where food comes from.
          </p>
        </div>

        <div className="space-y-3">
          {[
            "No middlemen between farmers and buyers",
            "Same-day delivery from local farms",
            "Fair prices for producers and consumers",
          ].map((point) => (
            <div key={point} className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path
                    d="M1 4l2 2 4-4"
                    stroke="#052e16"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-green-200 text-sm">{point}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-4 py-14">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#3B6D11" />
              <path
                d="M8 14c0-4 2.5-6 4-6s4 2 4 6"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M12 8v8"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-green-800 font-semibold text-base">
              Farm2Table
            </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Create an account
          </h1>
          <p className="text-sm text-gray-400 mb-7">
            Already have one?{" "}
            <Link
              to="/login"
              className="text-green-700 font-medium hover:underline"
            >
              Log in
            </Link>
          </p>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 mb-4">
              {success}{" "}
              <Link to="/login" className="font-semibold underline">
                Log in now
              </Link>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map(({ value, label, description, Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRole(value)}
                    className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-center transition-all ${
                      role === value
                        ? "border-green-600 bg-green-50 text-green-800"
                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${role === value ? "text-green-700" : "text-gray-400"}`}
                    />
                    <span className="text-sm font-semibold">{label}</span>
                    <span className="text-xs text-gray-400">{description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Full name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full name
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent placeholder-gray-300 disabled:opacity-50"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent placeholder-gray-300 disabled:opacity-50"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent placeholder-gray-300 disabled:opacity-50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent placeholder-gray-300 disabled:opacity-50 pr-10 ${
                    confirmPassword && confirmPassword !== password
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showConfirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {confirmPassword && confirmPassword !== password && (
                <p className="text-xs text-red-500 mt-1">
                  Passwords don't match
                </p>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
                className="mt-0.5 accent-green-600 w-4 h-4 flex-shrink-0"
              />
              <span className="text-xs text-gray-500 leading-relaxed">
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-green-700 hover:underline font-medium"
                >
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-green-700 hover:underline font-medium"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || !agreed}
              className="w-full bg-green-700 hover:bg-green-800 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
