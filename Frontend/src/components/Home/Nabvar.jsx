import { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-green-700">Farm2Table</div>
        <div className="hidden md:flex items-center space-x-6 text-gray-800 font-medium">
          <ul className="flex space-x-6 text-lg">
            <li>
              <Link to="/" className="hover:text-green-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-green-600">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-600">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-green-600">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-green-600">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-green-700 focus:outline-none cursor-pointer"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-3 text-gray-800 font-medium">
          <ul className="flex space-x-6 text-lg">
            <li>
              <Link to="/" className="hover:text-green-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-green-600">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-600">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-green-600">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-green-600">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
