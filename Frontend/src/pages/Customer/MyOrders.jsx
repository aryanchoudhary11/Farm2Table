import API from "../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, MapPin, CalendarDays, ChevronRight, X } from "lucide-react";

const statusConfig = {
  Pending: {
    classes: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
  },
  Packed: {
    classes: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
  "Out for Delivery": {
    classes: "bg-purple-50 text-purple-700 border-purple-200",
    dot: "bg-purple-500",
  },
  Delivered: {
    classes: "bg-green-50 text-green-700 border-green-200",
    dot: "bg-green-500",
  },
  Cancelled: {
    classes: "bg-red-50 text-red-600 border-red-200",
    dot: "bg-red-500",
  },
};

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [confirmCancel, setConfirmCancel] = useState(null);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.get("/api/products/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    setCancellingId(orderId);
    try {
      const token = localStorage.getItem("token");
      await API.patch(
        `/api/products/my-orders/${orderId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: "Cancelled" } : o,
        ),
      );
    } catch (err) {
      console.error("Error cancelling order:", err);
    } finally {
      setCancellingId(null);
      setConfirmCancel(null);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-semibold tracking-widest uppercase text-green-600 block mb-2">
            Account
          </span>
          <h1 className="text-3xl font-bold text-gray-900">My orders</h1>
          {orders.length > 0 && (
            <p className="text-sm text-gray-400 mt-1">
              {orders.length} {orders.length === 1 ? "order" : "orders"} total
            </p>
          )}
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 py-20 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-5">
              <Package className="w-7 h-7 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              No orders yet
            </h2>
            <p className="text-sm text-gray-400 max-w-xs mb-6">
              Once you place an order, it'll show up here.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-green-700 hover:bg-green-800 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
            >
              Start shopping
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => {
              const config = statusConfig[order.status] || statusConfig.Pending;
              const canCancel = order.status === "Pending";

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl border border-gray-100 p-5"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400 mb-1 font-mono truncate">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 leading-snug">
                        {order.items.map((i) => i.name).join(", ")}
                      </p>
                    </div>
                    <span
                      className={`flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${config.classes}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${config.dot}`}
                      />
                      {order.status}
                    </span>
                  </div>

                  {/* Meta row */}
                  <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-4">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    {order.address && (
                      <span className="flex items-center gap-1.5 truncate max-w-[200px]">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        {order.address}
                      </span>
                    )}
                  </div>

                  {/* Footer row */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <p className="text-base font-bold text-gray-900">
                      ₹{order.totalAmount}
                    </p>
                    <div className="flex items-center gap-2">
                      {canCancel && (
                        <button
                          onClick={() => setConfirmCancel(order._id)}
                          disabled={cancellingId === order._id}
                          className="text-xs font-medium text-red-500 hover:text-red-700 border border-red-200 hover:border-red-300 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      )}
                      {order.status !== "Cancelled" && (
                        <button
                          onClick={() =>
                            navigate(`/products/track-order/${order._id}`)
                          }
                          className="flex items-center gap-1 text-xs font-semibold text-white bg-green-700 hover:bg-green-800 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Track
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Cancel confirmation modal */}
      {confirmCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setConfirmCancel(null)}
          />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                <X className="w-5 h-5 text-red-500" />
              </div>
              <button
                onClick={() => setConfirmCancel(null)}
                className="text-gray-300 hover:text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-base font-bold text-gray-900 mb-1">
              Cancel this order?
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              This action cannot be undone. The order will be marked as
              cancelled.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmCancel(null)}
                className="flex-1 border border-gray-200 text-gray-600 text-sm font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Keep order
              </button>
              <button
                onClick={() => cancelOrder(confirmCancel)}
                disabled={cancellingId === confirmCancel}
                className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
              >
                {cancellingId === confirmCancel
                  ? "Cancelling..."
                  : "Yes, cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
