const Footer = () => {
  return (
    <footer>
      <div>
        <div>
          <h2>Farm2Table</h2>
          <p>
            Connecting local farmers with your table — fresh, fast, and fair.
          </p>
        </div>
        <div>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Login</a>
            </li>
          </ul>
        </div>
        <div>
          <h3>Follow Us</h3>
          <div>
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
      <div>
        &copy; {new Date().getFullYear()} Farm2Table. All rights reserved.
      </div>
    </footer>
  );
};
export default Footer;
