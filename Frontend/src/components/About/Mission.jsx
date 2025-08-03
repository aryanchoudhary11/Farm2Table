import { FaBullseye, FaGlobe } from "react-icons/fa";
const Mission = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-10">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-800">
          Our Mission & Vision
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div
          className="bg-green-50 rounded-lg shadow-lg p-8 hover:shadow-xl transition duration-300"
          data-aos="fade-right"
        >
          <div className="flex items-center mb-4 text-green-700">
            <FaBullseye className="text-3xl mr-3" />
            <h3 className="text-2xl font-semibold">Our Mission</h3>
          </div>
          <p className="text-gray-700 text-lg">
            To build a sustainable food system by eliminating middlemen and
            empowering small-scale farmers.
          </p>
        </div>
        <div
          className="bg-green-50 rounded-lg shadow-lg p-8 hover:shadow-xl transition duration-300"
          data-aos="fade-left"
        >
          <div className="flex items-center mb-4 text-green-700">
            <FaGlobe className="text-3xl mr-3" />
            <h3 className="text-2xl font-semibold">Our Vision</h3>
          </div>
          <p className="text-gray-700 text-lg">
            To create a world where everyone has access to fresh, ethical, and
            local food.
          </p>
        </div>
      </div>
    </section>
  );
};
export default Mission;
