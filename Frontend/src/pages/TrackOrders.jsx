import { useEffect, useState } from "react";
import { FaBoxOpen, FaUser, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import axios from "axios";

const TrackOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          "http://localhost:5000/api/farmer/orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `http://localhost:5000/api/farmer/orders/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Response from backend:", data);
      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? data.order : order))
      );
    } catch (err) {
      console.error("Error updating status:", err);
      setError(err.response?.data?.message || "Failed to update status");
    }
  };
  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  return (
    <div className="mt-15 space-y-6">
      <h2 className="text-2xl font-semibold text-green-700">Track Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-lg shadow p-4 border border-gray-200 space-y-3"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  <FaBoxOpen className="inline mr-2 text-green-600" />
                  Order ID: <span className="text-gray-700">{order._id}</span>
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  <FaUser className="inline mr-1" />
                  {order.customer?.name || "Unknown Customer"}
                </p>
                <p className="text-sm text-gray-600">
                  <FaMapMarkerAlt className="inline mr-1" />
                  {order.address}
                </p>
              </div>
              <div className="text-sm text-gray-600 mt-3 md:mt-0">
                <FaClock className="inline mr-1" />
                <span className="font-medium">Palced on: </span>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </div>
            </div>
            <div className="text-sm">
              <span className="font-medium">Items Ordered:</span>
              <ul className="list-disc ml-6 mt-1">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.product?.name || "Unknown Product"} - Qty:{" "}
                    {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="text-sm">
                <span className="font-medium">Status: </span>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs ${
                    order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "Packed"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="flex gap-2">
                {order.status === "Pending" && (
                  <button
                    onClick={() => handleStatusChange(order._id, "Packed")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm cursor-pointer"
                  >
                    Mark as Packed
                  </button>
                )}
                {order.status === "Packed" && (
                  <button
                    onClick={() => handleStatusChange(order._id, "Delivered")}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm cursor-pointer"
                  >
                    Mark as Delivered
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
export default TrackOrders;
