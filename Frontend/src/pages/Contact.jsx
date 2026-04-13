import { useState } from "react";
import { Mail, Phone, Clock, Send, MessageSquare } from "lucide-react";

const contactDetails = [
  {
    icon: Mail,
    label: "Email us",
    primary: "achoudhary.aryan@gmail.com",
    primaryHref: "mailto:achoudhary.aryan@gmail.com",
    secondary: null,
  },
  {
    icon: Phone,
    label: "Call or WhatsApp",
    primary: "+91-6375249154",
    primaryHref: "tel:+916375249154",
    secondary: "Chat on WhatsApp",
    secondaryHref: "https://wa.me/916375249154",
  },
  {
    icon: Clock,
    label: "Support hours",
    primary: "Mon – Sat, 9 AM – 6 PM",
    primaryHref: null,
    secondary: "We usually reply within 2 hours",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      setStatus({ type: "error", msg: "Please fill in all fields." });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setStatus({
        type: "success",
        msg: "Message sent! We'll be in touch soon.",
      });
      setFormData({ name: "", email: "", message: "" });
      setSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-green-600 block mb-3">
            Get in touch
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            We'd love to hear
            <br />
            <span className="text-green-700">from you.</span>
          </h1>
          <p className="text-base text-gray-500 max-w-md mx-auto">
            Questions, feedback, or partnership enquiries — drop us a message
            and we'll get back to you quickly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Contact info panel */}
          <div className="lg:col-span-2 bg-green-950 rounded-2xl p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-green-800 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-green-300" />
                </div>
                <span className="text-green-300 text-xs font-semibold tracking-widest uppercase">
                  Contact info
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                Reach us directly
              </h2>
              <p className="text-green-400 text-sm mb-8 leading-relaxed">
                We're a small team — your message goes straight to someone who
                can actually help.
              </p>

              <div className="space-y-6">
                {contactDetails.map(
                  ({
                    icon: Icon,
                    label,
                    primary,
                    primaryHref,
                    secondary,
                    secondaryHref,
                  }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5 text-green-300" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-green-500 mb-0.5">
                          {label}
                        </p>
                        {primaryHref ? (
                          <a
                            href={primaryHref}
                            className="text-sm text-white hover:text-green-300 transition-colors"
                          >
                            {primary}
                          </a>
                        ) : (
                          <p className="text-sm text-white">{primary}</p>
                        )}
                        {secondary &&
                          (secondaryHref ? (
                            <a
                              href={secondaryHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-green-400 hover:text-green-200 transition-colors mt-0.5 block"
                            >
                              {secondary}
                            </a>
                          ) : (
                            <p className="text-xs text-green-500 mt-0.5">
                              {secondary}
                            </p>
                          ))}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Decorative dots */}
            <div className="mt-10 flex gap-2 opacity-30">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                />
              ))}
            </div>
          </div>

          {/* Form panel */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-7">
            <h2 className="text-base font-semibold text-gray-900 mb-6">
              Send us a message
            </h2>

            {status?.type === "success" ? (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-4">
                  <Send className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  Message sent!
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                  We'll get back to you within 2 hours on working days.
                </p>
                <button
                  onClick={() => setStatus(null)}
                  className="text-sm font-medium text-green-700 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status?.type === "error" && (
                  <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3">
                    {status.msg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent placeholder-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent placeholder-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent placeholder-gray-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {submitting ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
