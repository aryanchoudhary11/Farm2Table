import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-green-900 mb-2">Farm2Table</h2>
          <p className="text-sm">Connecting local farmers with your table.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-green-900">
                About
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-green-900">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-900">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-green-900">
                Login
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a href="" aria-label="Instagram">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="" aria-label="Twitter">
              <i className="fab fa-twitter text-xl"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Farm2Table. All rights reserved.
      </div>
    </footer>
  );
};
export default Footer;
