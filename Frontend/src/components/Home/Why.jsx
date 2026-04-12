import { Sprout, Users, Truck } from "lucide-react";

const features = [
  {
    icon: Sprout,
    title: "Hyperlocal sourcing",
    description:
      "Produce comes from farms within a short radius of your location — picked fresh, not stored for weeks.",
  },
  {
    icon: Users,
    title: "Farmers earn more",
    description:
      "No middlemen, no hidden cuts. Farmers set their own prices and keep what they earn.",
  },
  {
    icon: Truck,
    title: "Same-day delivery",
    description:
      "Order in the morning, receive by evening. Always harvested within 24 hours of delivery.",
  },
];

const Purpose = () => {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-green-600 mb-3 block">
            Why we're different
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Food the way it should be
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            We cut out every unnecessary step between the field and your plate.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group border border-gray-100 rounded-2xl p-7 hover:border-green-200 hover:shadow-sm transition-all duration-200 bg-white"
            >
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-5 group-hover:bg-green-100 transition-colors">
                <Icon className="w-5 h-5 text-green-700" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Purpose;
