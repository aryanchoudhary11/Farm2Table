import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "500+", label: "Farmers onboard" },
  { value: "0%", label: "Commission (first 3 mo.)" },
  { value: "~2hr", label: "Average delivery time" },
  { value: "4.9★", label: "Average farmer rating" },
];

const FarmerCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-green-950 py-20 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <div>
          <span className="text-xs font-semibold tracking-widest uppercase text-green-400 block mb-4">
            For farmers
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-green-50 mb-5 leading-snug">
            Sell directly to customers who care where their food comes from.
          </h2>
          <p className="text-green-300 text-base mb-8 leading-relaxed">
            Join hundreds of local farmers already growing their business on
            Farm2Table. No commissions on your first 3 months, and no middlemen
            — ever.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center gap-2 bg-green-400 hover:bg-green-300 text-green-950 font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
            >
              Start selling today
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/about")}
              className="text-green-300 border border-green-700 hover:border-green-500 hover:text-green-100 font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
            >
              Learn more
            </button>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="bg-green-900/40 border border-green-800 rounded-2xl p-5 text-center"
            >
              <p className="text-3xl font-bold text-green-300 mb-1">{value}</p>
              <p className="text-xs text-green-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FarmerCTA;
