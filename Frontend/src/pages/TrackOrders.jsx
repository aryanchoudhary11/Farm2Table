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
    <div className="mt-15">
      <h2>Track Orders</h2>
      {ordersMock.map((order) => (
        <div key={order.id}>
          <div>
            <div>
              <h3>
                <FaBoxOpen />
                Order id: <span>{order.id}</span>
              </h3>
              <p>
                <FaUser />
                {order.customerName}
              </p>
              <p>
                <FaMapMarkerAlt />
                {order.address}
              </p>
            </div>
            <div>
              <FaClock />
              <span>Expected: </span> {order.deliveryTime}
            </div>
          </div>
          <div>
            <span>Items Ordered:</span>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} - Qty: {item.qty}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div>
              <span>Status: </span> <span>{order.status}</span>
            </div>
          </div>
          <div>
            {order.status === "Pending" && <button>Mark as Packed</button>}
            {order.status === "Packed" && <button>Mark as Delivered</button>}
          </div>
        </div>
      ))}
    </div>
  );
};
export default TrackOrders;
