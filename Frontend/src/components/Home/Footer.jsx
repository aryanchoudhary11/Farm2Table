import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-14 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
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
              <span className="text-base font-semibold text-green-800">
                Farm2Table
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[180px]">
              Connecting local farmers with customers who value freshness and
              fairness.
            </p>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
              Company
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-500 hover:text-green-700 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-sm text-gray-500 hover:text-green-700 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-sm text-gray-500 hover:text-green-700 transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
              Support
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/faq"
                  className="text-sm text-gray-500 hover:text-green-700 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-gray-500 hover:text-green-700 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-gray-500 hover:text-green-700 transition-colors"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
              Account
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/login"
                  className="text-sm text-gray-500 hover:text-green-700 transition-colors"
                >
                  Log in
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-sm text-gray-500 hover:text-green-700 transition-colors"
                >
                  Sign up
                </Link>
              </li>
              <li>
                <Link
                  to="/farmer-onboarding"
                  className="text-sm text-gray-500 hover:text-green-700 transition-colors"
                >
                  Farmer portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Farm2Table. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a
              href="#"
              className="text-xs text-gray-400 hover:text-green-700 transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-xs text-gray-400 hover:text-green-700 transition-colors"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-xs text-gray-400 hover:text-green-700 transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
