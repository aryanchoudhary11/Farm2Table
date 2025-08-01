import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

const Working = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 text-base md:text-lg mb-12 max-w-xl mx-auto">
          From browsing to delivery — simple, fast, and local.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div
            className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center w-full md:w-1/3"
            data-aos="fade-up"
          >
            <div className="text-5xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Browse Fresh Produce
            </h3>
            <p className="text-gray-600 text-sm">
              Explore local fruits, veggies, and more.
            </p>
          </div>
          <div className="hidden md:block text-3xl text-gray-400">→</div>

          <div
            className="flex flex-col items-center justify-center bg-white p-6 text-center w-full md:w-1/3 rounded-xl shadow-md"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="text-5xl mb-4">💳</div>
            <h3 className="text-gray-800 text-xl mb-2 font-semibold">
              Place Order
            </h3>
            <p className="text-gray-600 text-sm">Pay via wallet or Razorpay</p>
          </div>
          <div className="hidden md:block text-gray-400 text-3xl">→</div>

          <div
            className="bg-white p-6 flex flex-col items-center justify-center text-center w-full md:w-1/3 rounded-xl shadow-md"
            data-aos="fade-up"
            data-aos-display="200"
          >
            <div className="text-5xl mb-4">🚚</div>
            <h3 className="text-gray-800 text-xl font-semibold mb-2">
              Get delivery
            </h3>
            <p className="text-gray-600 text-sm">
              Delivered same-day from nearby farms
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Working;
