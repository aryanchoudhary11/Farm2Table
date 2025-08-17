import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Packed: "bg-blue-100 text-blue-700 border-blue-300",
  Delivered: "bg-green-100 text-green-700 border-green-300",
};
const MyOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "http://localhost:5000/api/products/my-orders",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  if (loading) return <p className="p-4">Loading orders...</p>;
  return (
    <div className="p-4 md:p-8 mt-15 bg-green-50 min-h-screen">
      <h1 className="text-2xl font-bold text-green-800 mb-6">My Orders</h1>
      <div>
        {orders.length === 0 && <p>No orders found.</p>}
        {orders.map((order, index) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg p-4 border border-green-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                <p className="font-semibold text-green-800">
                  {order.items.map((i) => i.name).join(", ")}
                </p>
                <p className="text-sm text-gray-400">
                  📅 {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col md:items-end mt-3 md:mt-0">
                <span
                  className={`px-3 py-1 rounded-full border text-sm font-medium ${
                    statusColors[order.status]
                  }`}
                >
                  {order.status}
                </span>
                <p className="font-bold text-green-700 mt-2">
                  {" "}
                  ₹{order.totalAmount}
                </p>
              </div>
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={() => navigate(`/products/track-order/${order._id}`)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 cursor-pointer transition"
              >
                Track Order
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default MyOrders;
