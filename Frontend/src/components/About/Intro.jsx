import AOS from "aos";
import "aos/dist/aos.css";
import marketImg from "../../assets/farmers-market.jpg";
import { useEffect } from "react";

const Intro = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);
  return (
    <section className="bg-[#f1f8f4] py-16 px-6 md:px-20 flex flex-col-reverse md:flex-row items-center gap-10 mt-6">
      <div data-aos="fade-right" className="flex-1">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
          Empowering Farmers. Nourishing Communities.
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Farm2Table is a hyperlocal marketplace connecting local farmers
          directly to consumers. We believe in ethical sourcing, fair pricing,
          and fresh, unprocessed food.
        </p>
      </div>
      <div data-aos="fade-left" className="relative w-full max-w-md mx-auto">
        <div className="absolute inset-0 rounded-xl blur-xl bg-gradient-to-br from-green-300 to-green-500 opacity-30 animate-pulse z-0"></div>
        <img
          src={marketImg}
          alt="Farmers' market"
          className="relative z-10 w-full rounded-xl shadow-xl"
        />
      </div>
    </section>
  );
};
export default Intro;
