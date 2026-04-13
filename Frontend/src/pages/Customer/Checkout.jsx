import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Truck,
  CreditCard,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import API from "../../api";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "14px",
      color: "#111827",
      fontFamily: "inherit",
      "::placeholder": { color: "#9ca3af" },
    },
    invalid: { color: "#ef4444" },
  },
};

const Checkout = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [paymentMethod, setPaymentMethod] = useState("cod");
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
      const { data } = await API.get("/api/products/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const validItems = (data || []).filter((item) => item && item.product);
      setCartItems(validItems);
      const subTotalCalc = validItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0,
      );
      setSubTotal(subTotalCalc);
      const delivery = subTotalCalc > 0 && subTotalCalc < 99 ? 20 : 0;
      setDeliveryFee(delivery);
      setTotalAmount(subTotalCalc + delivery);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCartItems([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const placeOrderhandler = async () => {
    if (!address.trim()) {
      setError("Please enter a delivery address.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      const validItems = cartItems.filter((i) => i && i.product);

      if (paymentMethod === "cod") {
        await API.post(
          "/api/products/checkout",
          {
            _id: user._id,
            items: validItems.map((i) => ({
              product: i.product._id,
              quantity: i.quantity,
            })),
            address,
            paymentMethod: "cod",
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setSuccessMessage("Order placed successfully!");
        setTimeout(() => navigate("/products/my-orders"), 1800);
      }

      if (paymentMethod === "stripe") {
        const { data } = await API.post(
          "/api/products/create-payment-intent",
          { items: validItems, address },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const clientSecret = data?.clientSecret;
        if (!clientSecret) throw new Error("No client secret returned");

        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: elements.getElement(CardElement) },
        });

        if (result.error) {
          setError(result.error.message);
        } else if (result.paymentIntent.status === "succeeded") {
          await API.post(
            "/api/products/checkout",
            {
              _id: user._id,
              items: validItems.map((i) => ({
                product: i.product._id,
                quantity: i.quantity,
              })),
              address,
              paymentMethod: "stripe",
              paymentIntentId: result.paymentIntent.id,
            },
            { headers: { Authorization: `Bearer ${token}` } },
          );
          setSuccessMessage("Payment successful — order placed!");
          setTimeout(() => navigate("/products/my-orders"), 1800);
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to place order.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (successMessage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {successMessage}
          </h2>
          <p className="text-sm text-gray-400">Redirecting to your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-semibold tracking-widest uppercase text-green-600 block mb-2">
            Almost there
          </span>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Delivery address */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-green-700" />
                </div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Delivery address
                </h2>
              </div>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                placeholder="Enter your full delivery address, including landmark..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent resize-none"
              />
            </div>

            {/* Payment method */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-green-700" />
                </div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Payment method
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {/* COD option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                    paymentMethod === "cod"
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      paymentMethod === "cod" ? "bg-green-100" : "bg-gray-100"
                    }`}
                  >
                    <Truck
                      className={`w-4 h-4 ${
                        paymentMethod === "cod"
                          ? "text-green-700"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        paymentMethod === "cod"
                          ? "text-green-800"
                          : "text-gray-700"
                      }`}
                    >
                      Cash on delivery
                    </p>
                    <p className="text-xs text-gray-400">
                      Pay when you receive
                    </p>
                  </div>
                  {paymentMethod === "cod" && (
                    <div className="ml-auto w-4 h-4 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path
                          d="M1 4l2 2 4-4"
                          stroke="#fff"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </button>

                {/* Stripe option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("stripe")}
                  className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                    paymentMethod === "stripe"
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      paymentMethod === "stripe"
                        ? "bg-green-100"
                        : "bg-gray-100"
                    }`}
                  >
                    <CreditCard
                      className={`w-4 h-4 ${
                        paymentMethod === "stripe"
                          ? "text-green-700"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        paymentMethod === "stripe"
                          ? "text-green-800"
                          : "text-gray-700"
                      }`}
                    >
                      Card (Stripe)
                    </p>
                    <p className="text-xs text-gray-400">
                      Visa, Mastercard, etc.
                    </p>
                  </div>
                  {paymentMethod === "stripe" && (
                    <div className="ml-auto w-4 h-4 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path
                          d="M1 4l2 2 4-4"
                          stroke="#fff"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              </div>

              {/* Stripe card element */}
              {paymentMethod === "stripe" && (
                <div className="border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
                  <p className="text-xs text-gray-400 mb-2">Card details</p>
                  <CardElement options={CARD_ELEMENT_OPTIONS} />
                </div>
              )}
            </div>
          </div>

          {/* Right column — order summary */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 h-fit sticky top-24">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">
              Order summary
            </h2>

            {/* Item list */}
            <div className="space-y-2 mb-4">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-gray-600 truncate max-w-[60%]">
                      {item.product.name}{" "}
                      <span className="text-gray-400">× {item.quantity}</span>
                    </span>
                    <span className="text-gray-800 font-medium">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">Your cart is empty.</p>
              )}
            </div>

            <div className="border-t border-gray-100 pt-3 space-y-2 mb-4">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span className="text-gray-800 font-medium">₹{subTotal}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Delivery</span>
                {deliveryFee === 0 ? (
                  <span className="text-green-600 font-medium">Free</span>
                ) : (
                  <span className="text-gray-800 font-medium">
                    ₹{deliveryFee}
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-3 mb-5">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-900">
                  Total
                </span>
                <span className="text-xl font-bold text-gray-900">
                  ₹{totalAmount}
                </span>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl px-3 py-2.5 mb-4">
                {error}
              </div>
            )}

            <button
              onClick={placeOrderhandler}
              disabled={loading || cartItems.length === 0}
              className="w-full bg-green-700 hover:bg-green-800 disabled:opacity-50 text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Placing order...
                </>
              ) : (
                <>
                  Place order
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-xs text-gray-400 text-center mt-3">
              {paymentMethod === "cod"
                ? "You'll pay in cash when your order arrives."
                : "Your payment is processed securely via Stripe."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
