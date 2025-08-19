import { Link } from "react-router-dom";
const CTASection = () => {
  return (
    <section className="bg-green-100 py-12 px-4 md:px-8 text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to grow with us?</h2>
      <p className="text-lg text-gray-700 mb-6">
        Create your farmer account and start selling in minutes.
      </p>
      <Link
        to="/signup"
        className="bg-green-600 inline-block text-white py-3 px-6 rounded-lg text-lg font-semibold shadow hover:bg-green-700 transition"
      >
        Register as Farmer
      </Link>
    </section>
  );
};
export default CTASection;
