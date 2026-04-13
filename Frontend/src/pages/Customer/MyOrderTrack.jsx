import API from "../../api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ShoppingCart,
  Package,
  Truck,
  CheckCircle,
  ArrowLeft,
  MapPin,
  CalendarDays,
} from "lucide-react";

const steps = [
  {
    label: "Order placed",
    sublabel: "We've received your order",
    icon: ShoppingCart,
  },
  { label: "Packed", sublabel: "Your items are being packed", icon: Package },
  {
    label: "Out for delivery",
    sublabel: "Your order is on the way",
    icon: Truck,
  },
  {
    label: "Delivered",
    sublabel: "Order delivered successfully",
    icon: CheckCircle,
  },
];

const statusMap = {
  Pending: 0,
  Packed: 1,
  "Out for Delivery": 2,
  Delivered: 3,
};

const TrackOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.get(`/api/products/track-order/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrder(data);
    } catch (err) {
      console.error("Error fetching order:", err);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">Loading order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-4">Order not found.</p>
          <button
            onClick={() => navigate("/products/my-orders")}
            className="text-sm font-medium text-green-700 hover:underline"
          >
            Back to orders
          </button>
        </div>
      </div>
    );
  }

  const currentStep = statusMap[order.status] ?? 0;
  const isCancelled = order.status === "Cancelled";

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate("/products/my-orders")}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to orders
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="text-xs font-semibold tracking-widest uppercase text-green-600 block mb-2">
            Order tracking
          </span>
          <h1 className="text-2xl font-bold text-gray-900">Track your order</h1>
          <p className="text-xs text-gray-400 mt-1 font-mono">
            #{order._id.slice(-8).toUpperCase()}
          </p>
        </div>

        {/* Order meta card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
          <div className="flex flex-wrap gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5" />
              Placed on{" "}
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            {order.address && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {order.address}
              </span>
            )}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-2">Items in this order</p>
            <div className="space-y-1">
              {order.items?.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.name}{" "}
                    {item.quantity && (
                      <span className="text-gray-400">× {item.quantity}</span>
                    )}
                  </span>
                  {item.price && (
                    <span className="text-gray-600 font-medium">
                      ₹{item.price * (item.quantity || 1)}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-900">Total</span>
              <span className="text-base font-bold text-gray-900">
                ₹{order.totalAmount}
              </span>
            </div>
          </div>
        </div>

        {/* Tracker card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          {isCancelled ? (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M15 9l-6 6M9 9l6 6" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">
                Order cancelled
              </h3>
              <p className="text-sm text-gray-400">
                This order was cancelled and will not be processed.
              </p>
            </div>
          ) : (
            <>
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-6">
                Status
              </p>

              {/* Vertical stepper */}
              <div className="space-y-0">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isCompleted = index < currentStep;
                  const isActive = index === currentStep;
                  const isLast = index === steps.length - 1;

                  return (
                    <div key={index} className="flex gap-4">
                      {/* Icon + connector */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                            isCompleted
                              ? "bg-green-600"
                              : isActive
                                ? "bg-green-700 ring-4 ring-green-100"
                                : "bg-gray-100"
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 ${
                              isCompleted || isActive
                                ? "text-white"
                                : "text-gray-400"
                            }`}
                          />
                        </div>
                        {!isLast && (
                          <div
                            className={`w-0.5 h-10 mt-0.5 rounded-full transition-colors ${
                              isCompleted ? "bg-green-500" : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>

                      {/* Label */}
                      <div className="pb-10 last:pb-0 pt-1">
                        <p
                          className={`text-sm font-semibold ${
                            isCompleted || isActive
                              ? "text-gray-900"
                              : "text-gray-400"
                          }`}
                        >
                          {step.label}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {step.sublabel}
                        </p>
                        {isActive && (
                          <span className="inline-block mt-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                            Current status
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
