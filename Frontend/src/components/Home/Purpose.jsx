const Purpose = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Why Farm2Table is Different?
        </h2>
        <p className="text-gray-600 text-base md:text-lg mb-12 max-w-2xl mx-auto">
          We're changing the way food reaches your plate – fresher, fairer, and
          faster.
        </p>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div className="bg-gray-50 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl p-6 flex flex-col items-center text-center">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Hyperlocal Sourcing
            </h3>
            <p className="text-gray-600 text-sm">
              We connect you with local farms near you
            </p>
          </div>
          <div className="bg-gray-50 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl p-6 flex flex-col items-center text-center">
            <div className="text-4xl mb-4">👨‍🌾</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Empower Farmers
            </h3>
            <p className="text-gray-600 text-sm">
              No middlemen, better prices for producers.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-50 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl p-6 flex flex-col items-center text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Same-Day Delivery
            </h3>
            <p className="text-gray-600 text-sm">
              Fresh produce delivered in hours, not days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Purpose;
