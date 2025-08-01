import bannerImage from "../assets/hero.avif";

const HeroBanner = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[75vh]">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bannerImage})` }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10" />

      <div className="relative z-20 flex items-center justify-center h-full text-center px-4 text-gray-800">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Welcome to Farm2Table
          </h1>
          <p className="text-base md:text-xl mb-6 italic">
            Ethical, hyperlocal groceries delivered same-day.
          </p>
          <div className="gap-3 flex justify-center">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg cursor-pointer transition-all duration-300 ease-in-out">
              Shop Now
            </button>
            <button className="border rounded-lg py-2 px-6 font-semibold hover:bg-green-600 hover:text-white cursor-pointer transition-all duration-300 ease-in-out">
              Become a farmer partner
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
