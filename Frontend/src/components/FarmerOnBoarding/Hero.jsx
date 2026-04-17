import happyFarmer from "../../assets/HappyFarmer.png";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-white pt-24 pb-0 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Top label */}
        <div className="text-center mb-8">
          <span className="text-xs font-semibold tracking-widest uppercase text-green-600">
            For farmers
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 text-center leading-tight mb-5">
          Grow your farm.
          <br />
          <span className="text-green-700">Grow your income.</span>
        </h1>

        <p className="text-base md:text-lg text-gray-500 text-center max-w-xl mx-auto mb-10 leading-relaxed">
          Sell your harvest directly to customers near you — no middlemen, no
          commission for the first 3 months, no hassle.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 justify-center mb-14">
          <Link
            to="/signup"
            className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-xl transition-colors shadow-sm"
          >
            Start selling today
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Hero image — flush to bottom */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white to-transparent z-10" />
          <img
            src={happyFarmer}
            alt="Happy farmer"
            className="w-full h-auto object-cover rounded-t-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
