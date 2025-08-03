import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
const Newsletter = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);
  return (
    <section className="bg-green-100 py-12 px-4 md:px-10 " data-aos="zoom-in">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
          Want fresh Updates?
        </h2>
        <p className="text-gray-700 mb-6">
          Subscribe to get fresh produce deals & local farm news!
        </p>
      </div>
      <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <input
          type="email"
          placeholder="Enter Your Email..."
          className="w-full sm:w-2/3 px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-3  focus:ring-green-400 transition"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition cursor-pointer"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};
export default Newsletter;
