import farmersProduce from "../../assets/farmers-produce.jpg";

const stats = [
  {
    value: "40%",
    headline: "of fresh produce is wasted",
    detail:
      "Traditional supply chains are long and leaky. Food spoils in transit, in storage, and in warehouses before it ever reaches a plate.",
  },
  {
    value: "<30%",
    headline: "of retail price reaches the farmer",
    detail:
      "Middlemen, brokers, and distributors take the lion's share. The people who grow your food earn the least from it.",
  },
];

const WhyItMatters = () => {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-green-600 block mb-3">
            The problem
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why it matters
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            The traditional food supply chain is broken. We're fixing it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {stats.map(({ value, headline, detail }) => (
            <div key={value} className="border border-gray-100 rounded-2xl p-8">
              <p className="text-5xl font-bold text-red-600 mb-3">{value}</p>
              <p className="text-base font-semibold text-gray-900 mb-2">
                {headline}
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>

        {/* Resolution banner */}
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={farmersProduce}
            alt="Fresh farm produce"
            className="w-full h-[320px] object-cover"
          />
          <div className="absolute inset-0 bg-green-950/70" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="text-green-300 text-xs font-semibold tracking-widest uppercase mb-3">
              The Farm2Table difference
            </p>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              We change that.
            </h3>
            <p className="text-green-200 text-base max-w-md">
              Farmers list, customers order, and produce travels directly from
              field to doorstep — same day, every time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItMatters;
