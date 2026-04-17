import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="bg-green-950 py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <span className="text-xs font-semibold tracking-widest uppercase text-green-400 block mb-4">
          Join the community
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-snug">
          Ready to grow
          <br />
          <span className="text-green-400">with us?</span>
        </h2>
        <p className="text-green-300 text-base mb-10 leading-relaxed max-w-md mx-auto">
          Create your farmer account in minutes and start reaching customers in
          your area. No commission for the first 3 months.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 mb-10">
          {[
            ["0%", "Commission (3 mo.)"],
            ["4.9★", "Avg. farmer rating"],
          ].map(([value, label]) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold text-green-400">{value}</p>
              <p className="text-xs text-green-600 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/signup"
            className="flex items-center gap-2 bg-green-400 hover:bg-green-300 text-green-950 font-semibold py-3 px-8 rounded-xl transition-colors"
          >
            Register as farmer
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/about"
            className="text-green-300 border border-green-700 hover:border-green-500 hover:text-green-100 font-semibold py-3 px-8 rounded-xl transition-colors"
          >
            Learn more
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
