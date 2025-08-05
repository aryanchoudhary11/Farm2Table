import {
  FaRupeeSign,
  FaTruck,
  FaMobileAlt,
  FaUserFriends,
} from "react-icons/fa";
const WhySellWithUs = () => {
  const benefits = [
    {
      icon: <FaRupeeSign className="text-3xl text-green-600" />,
      title: "Higher Profits",
      desc: "No middlemen – keep more of what you earn.",
    },
    {
      icon: <FaTruck className="text-3xl text-green-600" />,
      title: "Same-Day Delivery",
      desc: "We handle local delivery so you can focus on farming.",
    },
    {
      icon: <FaMobileAlt className="text-3xl text-green-600" />,
      title: "Simple Dashboard",
      desc: "Easily manage your orders from any device.",
    },
    {
      icon: <FaUserFriends className="text-3xl text-green-600" />,
      title: "We Promote You",
      desc: "Get featured, supported, and celebrated as a local hero.",
    },
  ];
  return (
    <section className="bg-green-50 py-12 px-4 md:px-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Why Sell With Farm2Table?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg text-center transition"
          >
            <div className="mb-4 flex justify-center">{item.icon}</div>
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-gray-600 mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default WhySellWithUs;
