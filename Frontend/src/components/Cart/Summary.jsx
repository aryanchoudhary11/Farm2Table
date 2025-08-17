import { useNavigate } from "react-router-dom";
const Summary = ({ subTotal, deliveryFee }) => {
  const total = subTotal + deliveryFee;
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg p-6 shadow border border-green-100">
      <h2 className="text-xl font-semibold mb-4 text-green-800">
        Order Summary
      </h2>
      <div className="flex justify-between text-gray-700 mb-2">
        <span>Subtotal</span>
        <span>₹{subTotal}</span>
      </div>
      <div className="flex justify-between text-gray-700 mb-2">
        <span>Delivery Fee</span>
        <span>₹{deliveryFee}</span>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between font-bold text-green-800 text-lg mb-4">
        <span>Total</span>
        <span>₹{total}</span>
      </div>
      <button
        onClick={() => navigate("/products/checkout")}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition duration-200 cursor-pointer"
      >
        Proceed to CheckOut
      </button>
    </div>
  );
};
export default Summary;
