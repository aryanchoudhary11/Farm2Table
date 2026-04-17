import { useEffect, useState } from "react";
import { Package, User, MapPin, Clock, ChevronRight } from "lucide-react";
import API from "../api";

const statusConfig = {
  Pending: {
    classes: "bg-amber-50 text-amber-700 border-amber-100",
    dot: "bg-amber-500",
  },
  Packed: {
    classes: "bg-blue-50 text-blue-700 border-blue-100",
    dot: "bg-blue-500",
  },
  "Out for Delivery": {
    classes: "bg-purple-50 text-purple-700 border-purple-100",
    dot: "bg-purple-500",
  },
  Delivered: {
    classes: "bg-green-50 text-green-700 border-green-100",
    dot: "bg-green-500",
  },
  Cancelled: {
    classes: "bg-red-50 text-red-600 border-red-100",
    dot: "bg-red-400",
  },
};

const nextStatus = {
  Pending: "Packed",
  Packed: "Out for Delivery",
  "Out for Delivery": "Delivered",
};
const nextLabel = {
  Pending: "Mark as packed",
  Packed: "Mark out for delivery",
  "Out for Delivery": "Mark delivered",
};
const nextButtonColor = {
  Pending: "bg-blue-600 hover:bg-blue-700",
  Packed: "bg-purple-600 hover:bg-purple-700",
  "Out for Delivery": "bg-green-700 hover:bg-green-800",
};

const TrackOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await API.get("/api/farmer/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.put(
        `/api/farmer/orders/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? data.order : o)),
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <section className="py-8 flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">Loading orders...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 mt-10">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest uppercase text-green-600 mb-1">
          Orders
        </p>
        <h1 className="text-2xl font-bold text-gray-900">Track orders</h1>
        {orders.length > 0 && (
          <p className="text-sm text-gray-400 mt-1">
            {orders.length} orders received
          </p>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 py-20 flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
            <Package className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-base font-semibold text-gray-800 mb-1">
            No orders yet
          </h2>
          <p className="text-sm text-gray-400 max-w-xs">
            Orders from customers will appear here as soon as they come in.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const config = statusConfig[order.status] || statusConfig.Pending;
            const next = nextStatus[order.status];

            return (
              <div
                key={order._id}
                className="bg-white rounded-2xl border border-gray-100 p-5"
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400 font-mono mb-1">
                      #{order._id.slice(-8).toUpperCase()}
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {order.customer?.name || "Unknown customer"}
                      </span>
                      {order.address && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate max-w-[160px]">
                            {order.address}
                          </span>
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
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

                {/* Items */}
                <div className="bg-gray-50 rounded-xl px-4 py-3 mb-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Items
                  </p>
                  <div className="space-y-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-700">
                          {item.product?.name || "Unknown product"}
                        </span>
                        <span className="text-gray-400">× {item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <p className="text-base font-bold text-gray-900">
                    ₹{order.totalAmount ?? "Not available"}
                  </p>
                  {next && (
                    <button
                      onClick={() => handleStatusChange(order._id, next)}
                      disabled={updatingId === order._id}
                      className={`flex items-center gap-1.5 ${nextButtonColor[order.status]} disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer`}
                    >
                      {updatingId === order._id ? (
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          {nextLabel[order.status]}
                          <ChevronRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default TrackOrders;
