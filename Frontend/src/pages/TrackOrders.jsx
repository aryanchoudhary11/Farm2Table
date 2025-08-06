import { useState } from "react";
import { FaBoxOpen, FaUser, FaMapMarkerAlt, FaClock } from "react-icons/fa";
const ordersMock = [
  {
    id: "ORD12345",
    customerName: "Ravi Sharma",
    address: "123 Green Street, Village A",
    items: [
      { name: "Tomatoes", qty: 5 },
      { name: "Carrots", qty: 3 },
    ],
    status: "Pending",
    deliveryTime: "Today, 5:00 PM",
  },
  {
    id: "ORD12346",
    customerName: "Priya Mehta",
    address: "456 Mango Lane, Town B",
    items: [{ name: "Milk", qty: 2 }],
    status: "Packed",
    deliveryTime: "Today, 6:30 PM",
  },
];
const TrackOrders = () => {
  const [orders, setOrders] = useState(ordersMock);
  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };
  return (
    <div className="mt-15 space-y-6">
      <h2 className="text-2xl font-semibold text-green-700">Track Orders</h2>
      {ordersMock.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-lg shadow p-4 border border-gray-200 space-y-3"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                <FaBoxOpen className="inline mr-2 text-green-600" />
                Order ID: <span className="text-gray-700">{order.id}</span>
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                <FaUser className="inline mr-1" />
                {order.customerName}
              </p>
              <p className="text-sm text-gray-600">
                <FaMapMarkerAlt className="inline mr-1" />
                {order.address}
              </p>
            </div>
            <div className="text-sm text-gray-600 mt-3 md:mt-0">
              <FaClock className="inline mr-1" />
              <span className="font-medium">Expected: </span>{" "}
              {order.deliveryTime}
            </div>
          </div>
          <div className="text-sm">
            <span className="font-medium">Items Ordered:</span>
            <ul className="list-disc ml-6 mt-1">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} - Qty: {item.qty}
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
                  onClick={() => handleStatusChange(order.id, "Packed")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm cursor-pointer"
                >
                  Mark as Packed
                </button>
              )}
              {order.status === "Packed" && (
                <button
                  onClick={() => handleStatusChange(order.id, "Packed")}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm cursor-pointer"
                >
                  Mark as Delivered
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TrackOrders;
