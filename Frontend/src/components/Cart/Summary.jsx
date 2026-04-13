import { useNavigate } from "react-router-dom";
import { ArrowRight, Truck } from "lucide-react";

const Summary = ({ subTotal, deliveryFee }) => {
  const total = subTotal + deliveryFee;
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 h-fit sticky top-24">
      <h2 className="text-base font-semibold text-gray-900 mb-5">
        Order summary
      </h2>

      <div className="space-y-3 mb-5">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Subtotal</span>
          <span className="text-gray-800 font-medium">₹{subTotal}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5" />
            Delivery
          </span>
          {deliveryFee === 0 ? (
            <span className="text-green-600 font-medium text-sm">Free</span>
          ) : (
            <span className="text-gray-800 font-medium">₹{deliveryFee}</span>
          )}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-900">Total</span>
          <span className="text-xl font-bold text-gray-900">₹{total}</span>
        </div>
        {deliveryFee === 0 && subTotal > 0 && (
          <p className="text-xs text-green-600 mt-1 text-right">
            You saved ₹20 on delivery
          </p>
        )}
      </div>

      <button
        onClick={() => navigate("/products/checkout")}
        className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
      >
        Proceed to checkout
        <ArrowRight className="w-4 h-4" />
      </button>

      <p className="text-xs text-gray-400 text-center mt-4">
        Orders over ₹99 get free delivery
      </p>
    </div>
  );
};

export default Summary;
