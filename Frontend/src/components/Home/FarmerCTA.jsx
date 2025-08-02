import farmer from "../../assets/farmer.jpg";
const FarmerCTA = () => {
  return (
    <section className="bg-green-900 py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="w-full md:w-1/2 flex justify-center ">
          <div className="absolute w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-gradient-to-tr from-green-500 via-lime-400 to-green-700 blur-2xl opacity-20 rounded-full z-0 animate-pulse"></div>
          <img
            src={farmer}
            alt="Farmer"
            className="relative z-10 w-[300px] md:w-[400px] object-contain rounded-xl shadow-lg transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Are you a Local Farmer?
          </h2>
          <p className="text-white text-base md:text-lg mb-6">
            Join Farm2Table and grow your business directly with local
            customers.
          </p>
          <button className="bg-white text-green-900 font-semibold py-3 px-6 rounded-lg hover:bg-green-100 transition-all duration-300 cursor-pointer">
            Become a Farmer Parter
          </button>
        </div>
      </div>
    </section>
  );
};
export default FarmerCTA;
