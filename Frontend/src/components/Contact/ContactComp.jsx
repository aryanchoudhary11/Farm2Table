import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    e.preventDefault();
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      setStatus({ type: "error", msg: "All fields are required!" });
      return;
    }
    setStatus({ type: "success", msg: "Message sent successfully!" });
    setFormData({ name: "", email: "", message: "" });
  };
  return (
    <>
      <section className="bg-green-50 py-20 px-4 md:px-0 mt-6">
        <div className="max-w-2xl mx-auto text-center" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-green-700">
            Have questions, feedback, or need help? We’re here to assist.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white px-4">
        <div
          className="max-w-xl mx-auto bg-green-50 p-8 rounded-xl shadow-md"
          data-aos="fade-up"
        >
          {status && (
            <div
              className={`mb-4 text-center px-4 py-2 rounded ${
                status.type === "error"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {status.msg}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-green-800 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-green-800 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="w-full px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-green-800 font-medium mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows="4"
                className="w-full px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-green-600 text-white w-full rounded-full px-6 py-2 hover:bg-green-700 transition duration-300 cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
export default Contact;
