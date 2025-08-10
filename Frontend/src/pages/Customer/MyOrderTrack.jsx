import { motion } from "framer-motion";
import { FaShoppingCart, FaBox, FaTruck, FaCheck } from "react-icons/fa";

const steps = [
  { label: "Pending", icon: <FaShoppingCart /> },
  { label: "Packed", icon: <FaBox /> },
  { label: "Out for Delivery", icon: <FaTruck /> },
  { label: "Delivered", icon: <FaCheck /> },
];

const currentStep = 2;

const TrackOrder = () => {
  return (
    <div className="min-h-screen bg-green-50 p-8 mt-10">
      <h1 className="text-2xl font-bold text-green-800 mb-12 text-center">
        Track Your Order
      </h1>

      <div className="relative max-w-4xl mx-auto">
        {/* Background line */}
        <div className="absolute top-[24px] left-0 w-full h-1 bg-gray-300 z-0"></div>

        {/* Filled line */}
        <motion.div
          className="absolute top-[24px] left-0 h-1 bg-green-600 z-0"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.8 }}
        ></motion.div>

        {/* Steps */}
        <div className="flex justify-between relative z-10">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${
                  index <= currentStep
                    ? "border-green-600 bg-green-100"
                    : "border-gray-300 bg-gray-100"
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {step.icon}
              </motion.div>
              <span
                className={`mt-2 text-sm font-medium ${
                  index <= currentStep ? "text-green-800" : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
