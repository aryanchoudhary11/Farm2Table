import happyFarmer from "../../assets/HappyFarmer.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  });
  return (
    <section className="bg-green-50 py-12 px-4 md:px-10 lg:flex lg:items-center lg:justify-between">
      <div className="max-w-xl mb-10 lg:mb-0">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-4">
          Join the Fresh Movement
        </h1>
        <p className="text-lg text-green-700 mb-6">
          Sell your produce directly to nearby customers. Keep more profit.
        </p>
        <Link
          to="/register?role=farmer"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition"
        >
          Get Started
        </Link>
      </div>
      <div className="flex-shrink-0 w-full lg:w-[45%]" data-aos="fade-left">
        <img
          src={happyFarmer}
          alt="Happy farmer"
          className="rounded-xl shadow-md w-full h-auto object-cover"
        />
      </div>
    </section>
  );
};
export default Hero;
