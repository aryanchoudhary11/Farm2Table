import farmersProduce from "../../assets/farmers-produce.jpg";
const WhyItMatters = () => {
  return (
    <section className="bg-green-50 py-16 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        <div data-aos="fade-right">
          <img
            src={farmersProduce}
            alt="Fresh Produce"
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>

        <div data-aos="fade-left">
          <h2 className="text-3xl md:text-4xl text-green-800 font-bold mb-6">
            Why It matters?
          </h2>
          <ul className="space-y-6 text-lg text-gray-700">
            <li>
              <span className="text-4xl font-extrabold text-red-700">40%</span>{" "}
              of fresh produce is wasted in traditional supply chains.
            </li>
            <li>
              Farmers often earn{" "}
              <span className="text-4xl font-extrabold text-red-700">
                &lt;30%
              </span>{" "}
              of what customers pay.
            </li>
            <li className="text-xl mt-6 text-green-800 font-semibold">
              We change that.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
export default WhyItMatters;
