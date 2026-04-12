import { Target, Globe } from "lucide-react";

const cards = [
  {
    icon: Target,
    label: "Our mission",
    heading: "Eliminate the middleman",
    body: "To build a sustainable food system by connecting small-scale farmers directly to the people who eat their food — cutting out unnecessary steps, cost, and waste.",
    accent: "bg-green-50 border-green-200",
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
  },
  {
    icon: Globe,
    label: "Our vision",
    heading: "Food for everyone, everywhere",
    body: "A world where every person has access to fresh, ethical, and local food — and every farmer earns a fair share for the work they do.",
    accent: "bg-green-950 border-green-900",
    iconBg: "bg-green-800",
    iconColor: "text-green-300",
    dark: true,
  },
];

const Mission = () => {
  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-green-600 block mb-3">
            What drives us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Mission & vision
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map(
            ({
              icon: Icon,
              label,
              heading,
              body,
              accent,
              iconBg,
              iconColor,
              dark,
            }) => (
              <div key={label} className={`rounded-2xl border p-8 ${accent}`}>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 ${iconBg}`}
                >
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <span
                  className={`text-xs font-semibold tracking-widest uppercase block mb-2 ${
                    dark ? "text-green-400" : "text-green-600"
                  }`}
                >
                  {label}
                </span>
                <h3
                  className={`text-xl font-bold mb-3 ${
                    dark ? "text-green-50" : "text-gray-900"
                  }`}
                >
                  {heading}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    dark ? "text-green-300" : "text-gray-500"
                  }`}
                >
                  {body}
                </p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default Mission;
