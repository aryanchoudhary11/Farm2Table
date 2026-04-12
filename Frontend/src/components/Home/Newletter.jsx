import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="bg-white py-16 px-4 border-t border-gray-100">
      <div className="max-w-xl mx-auto text-center">
        <span className="text-xs font-semibold tracking-widest uppercase text-green-600 block mb-3">
          Stay in the loop
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Fresh updates in your inbox
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Weekly deals, harvest updates, and new farmer spotlights. No spam —
          unsubscribe any time.
        </p>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-green-800 font-medium text-sm">
            You're on the list! We'll be in touch soon.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors duration-200 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
