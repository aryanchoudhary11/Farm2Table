import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const navigate = useNavigate();

  // Mock data
  const subTotal = 150;
  const deliveryFee = subTotal > 0 && subTotal < 99 ? 20 : 0;
  const totalAmount = subTotal + deliveryFee;
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [address, setAddress] = useState("123 Farm Lane, Greenfield City");
  const [successMessage, setSuccessMessage] = useState("");

  const placeOrderhandler = () => {
    setSuccessMessage("✅ Order placed successfully!");
    setTimeout(() => {
      navigate("/customer/my-orders");
    }, 1500);
  };
  return (
    <div className="mt-15 p-4 md:p-8 bg-green-50 min-h-screen">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-4 border border-green-800">
            <h2 className="text-lg font-semibold text-green-800 mb-4">
              Payment Method
            </h2>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="radio"
                value="wallet"
                checked={paymentMethod === "wallet"}
                onChange={() => setPaymentMethod("wallet")}
              />
              Pay via Wallet
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="wallet"
                checked={paymentMethod === "razorpay"}
                onChange={() => setPaymentMethod("razorpay")}
              />
              Pay via Razorpay
            </label>
          </div>
          <div className="bg-white shadow border rounded-lg p-4 border-green-800">
            <h2 className="text-lg font-semibold text-green-800 mb-4">
              Delivery Address
            </h2>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows="3"
              className="w-full p-2 border rounded-lg focus:outline-green-500"
            />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow border p-4 border-green-800">
          <h2 className="text-lg font-semibold text-green-800 mb-4">
            Order Summary
          </h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{subTotal}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-bold text-green-700">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>
          <button
            onClick={placeOrderhandler}
            className="mt-4 w-full bg-green-600 text-white p-2 rounded-lg font-semibold hover:bg-green-700 cursor-pointer transition"
          >
            Place Order
          </button>
          {successMessage && (
            <p className="text-green-600 mt-3 text-center font-semibold">
              {successMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Checkout;
