import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Checkout = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [address, setAddress] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "http://localhost:5000/api/products/cart",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCartItems(data || []);
      const subTotalCalc = (data || []).reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      setSubTotal(subTotalCalc);
      const delivery = subTotalCalc > 0 && subTotalCalc < 99 ? 20 : 0;
      setDeliveryFee(delivery);
      const total = subTotalCalc + delivery;
      setTotalAmount(total);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCartItems([]);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

  const placeOrderhandler = async () => {
    if (!address) return setError("Please enter a delivery address!");
    setLoading(true);
    setError("");

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (paymentMethod === "cod") {
        const payload = {
          _id: user._id,
          items: cartItems.map((i) => ({
            product: i.product._id,
            quantity: i.quantity,
          })),
          address,
          paymentMethod: "cod",
        };

        await axios.post(
          "http://localhost:5000/api/products/checkout",
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setSuccessMessage("✅ Order placed successfully (COD)!");
        setTimeout(() => navigate("/products/my-orders"), 1500);
      }

      if (paymentMethod === "stripe") {
        const { data } = await axios.post(
          "http://localhost:5000/api/products/create-payment-intent",
          { items: cartItems, address },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const clientSecret = data?.clientSecret;
        if (!clientSecret)
          throw new Error("No client secret returned from backend");
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

        if (result.error) {
          setError(result.error.message);
        } else if (result.paymentIntent.status === "succeeded") {
          const payload = {
            _id: user._id,
            items: cartItems.map((i) => ({
              product: i.product._id,
              quantity: i.quantity,
            })),
            address,
            paymentMethod: "stripe",
            paymentIntentId: result.paymentIntent.id,
          };

          await axios.post(
            "http://localhost:5000/api/products/checkout",
            payload,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          setSuccessMessage("✅ Payment successful & order placed!");
          setTimeout(() => navigate("/products/my-orders"), 1500);
        }
      }
    } catch (err) {
      console.error("Error confirming order:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
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
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              Cash on delivery
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="stripe"
                checked={paymentMethod === "stripe"}
                onChange={() => setPaymentMethod("stripe")}
              />
              Pay via Stripe
            </label>
            {paymentMethod === "stripe" && (
              <div className="border p-2 rounded-lg mt-2">
                <CardElement />
              </div>
            )}
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
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                className="flex justify-between mb-2 text-green-700 font-medium"
                key={item._id}
              >
                <span>
                  {item.product.name} x {item.quantity}
                </span>
                <span>₹{item.product.price * item.quantity}</span>
              </div>
            ))
          ) : (
            <p> </p>
          )}
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
          {error && (
            <p className="text-red-600 mt-2 text-center font-semibold">
              {error}
            </p>
          )}
          <button
            onClick={placeOrderhandler}
            disabled={loading}
            className="mt-4 w-full bg-green-600 text-white p-2 rounded-lg font-semibold hover:bg-green-700 cursor-pointer transition"
          >
            {loading ? "Placing Order..." : "Place Order"}
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
