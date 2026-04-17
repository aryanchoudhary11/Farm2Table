import marketImg from "../../assets/farmers-market.jpg";

const Intro = () => {
  return (
    <section className="bg-white pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Page label */}
        <span className="text-xs font-semibold tracking-widest uppercase text-green-600 block mb-6 text-center">
          About Farm2Table
        </span>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center leading-tight mb-6 max-w-3xl mx-auto">
          Empowering farmers.
          <br />
          <span className="text-green-700">Nourishing communities.</span>
        </h1>

        <p className="text-base md:text-lg text-gray-500 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
          Farm2Table is a hyperlocal marketplace connecting local farmers
          directly to consumers — built on ethical sourcing, fair pricing, and
          food the way it should be.
        </p>

        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={marketImg}
            alt="Farmers' market"
            className="w-full h-[420px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-4">
            {[
              { value: "12k+", label: "Happy customers" },
              { value: "2hr", label: "Average delivery" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="bg-white/90 backdrop-blur-sm rounded-xl px-5 py-3"
              >
                <p className="text-lg font-bold text-green-800">{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
