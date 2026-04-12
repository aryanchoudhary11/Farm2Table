import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-white transition-shadow duration-200 ${
        scrolled ? "shadow-sm" : ""
      } border-b border-gray-100`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
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
          <span className="text-[17px] font-semibold text-green-800 tracking-tight">
            Farm2Table
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>

          {token && user?.role === "farmer" && (
            <NavLink to="/farmer">Dashboard</NavLink>
          )}

          {token && user?.role === "customer" && (
            <Link
              to="/products/cart"
              className="p-2 rounded-lg text-gray-500 hover:text-green-700 hover:bg-green-50 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </Link>
          )}

          <div className="ml-3 flex items-center gap-2">
            {token ? (
              <button
                onClick={logoutHandler}
                className="text-sm font-medium text-gray-600 hover:text-green-700 transition-colors px-3 py-2 rounded-lg hover:bg-green-50"
              >
                Log out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-green-700 transition-colors px-3 py-2 rounded-lg hover:bg-green-50"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-medium bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-3 pb-5 space-y-1">
          <MobileNavLink to="/">Home</MobileNavLink>
          <MobileNavLink to="/about">About</MobileNavLink>
          <MobileNavLink to="/contact">Contact</MobileNavLink>

          {token && user?.role === "farmer" && (
            <MobileNavLink to="/farmer">Dashboard</MobileNavLink>
          )}
          {token && user?.role === "customer" && (
            <MobileNavLink to="/products/cart">Cart</MobileNavLink>
          )}

          <div className="pt-3 border-t border-gray-100 mt-3">
            {token ? (
              <button
                onClick={logoutHandler}
                className="w-full text-left text-sm font-medium text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                Log out
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  className="text-sm font-medium text-center border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-medium text-center bg-green-700 text-white px-4 py-2.5 rounded-lg hover:bg-green-800"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-sm font-medium text-gray-600 hover:text-green-700 px-3 py-2 rounded-lg hover:bg-green-50 transition-colors"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children }) => (
  <Link
    to={to}
    className="block text-sm font-medium text-gray-700 px-3 py-2.5 rounded-lg hover:bg-green-50 hover:text-green-700"
  >
    {children}
  </Link>
);

export default Navbar;
