import { useState, useRef } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Just sign in, browse local products, add to cart, and pay via wallet or Razorpay.",
  },
  {
    question: "How do farmers register?",
    answer:
      "Click “Become a Farmer” and fill out the registration form. We’ll verify and approve within 24 hrs.",
  },
  {
    question: "Is delivery really same-day?",
    answer:
      "Yes! Orders before 5PM are delivered the same day in your local area.",
  },
  {
    question: "How do I get a refund or use my wallet balance?",
    answer:
      "Refunds go to your wallet. You can use the balance during future checkouts.",
  },
  {
    question: "Can I schedule deliveries?",
    answer:
      "Currently, all deliveries are same-day or next-day based on your time slot.",
  },
  {
    question: "Where does the produce come from?",
    answer: "Directly from verified farms within 10–30km of your location.",
  },
  {
    question: "Is there a minimum order amount?",
    answer:
      "Yes, ₹99 for free delivery. Otherwise, a small ₹20 delivery fee applies.",
  },
];

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = activeIndex === index;

        return (
          <div
            key={index}
            className="border rounded-xl transition-all bg-white shadow-sm hover:shadow-md px-4"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex justify-between items-center py-4 text-left font-medium cursor-pointer"
            >
              {faq.question}
              {isOpen ? (
                <FaChevronUp className="text-green-600" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </button>

            {/* Animated answer section */}
            <div
              ref={(el) => (contentRefs.current[index] = el)}
              className="overflow-hidden transition-all duration-500 ease-in-out"
              style={{
                maxHeight: isOpen
                  ? `${contentRefs.current[index]?.scrollHeight}px`
                  : "0px",
              }}
            >
              <div className="px-4 pb-4 text-gray-600 text-sm">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
