import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <nav>
      <div>
        <div>Farm2Table</div>
        <div>
          <a href="#">Home</a>
          <a href="#">Contact</a>
          <a href="#">Login</a>
          <a href="#">Sign Up</a>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-green-700 focus:outline-none"
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
          <a href="#" className="block hover:text-green-600 transition">
            Home
          </a>
          <a href="#" className="block hover:text-green-600 transition">
            Contact
          </a>
          <a href="#" className="block hover:text-green-600 transition">
            Login
          </a>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
