import {
  FaBox,
  FaClipboardList,
  FaWallet,
  FaPlusCircle,
  FaEye,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import API from "../api";
const FarmerDashboardHome = () => {
  const [stats, setStats] = useState([
    {
      title: "Total Products",
      value: 0,
      icon: <FaBox className="text-3xl text-green-600" />,
    },
    {
      title: "Orders Received",
      value: 0,
      icon: <FaClipboardList className="text-3xl text-green-600" />,
    },
    {
      title: "Wallet Balance",
      value: "₹0",
      icon: <FaWallet className="text-3xl text-green-600" />,
    },
  ]);
  useEffect(() => {
    const fetchDashboardstats = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await API.get("/api/farmer", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats([
          {
            title: "Total Products",
            value: data.totalProducts,
            icon: <FaBox className="text-3xl text-green-600" />,
          },
          {
            title: "Orders received",
            value: data.totalOrders,
            icon: <FaClipboardList className="text-3xl text-green-600" />,
          },
          {
            title: "Wallet Balance",
            value: `₹${data.walletBalance}`,
            icon: <FaWallet className="text-3xl text-green-600" />,
          },
        ]);
      } catch (err) {
        console.error("Error fetching dashboard stats", err);
      }
    };
    fetchDashboardstats();
  }, []);
  return (
    <section className="px-4 md:px-8 py-10 md:py-20">
      <h2 className="text-2xl font-bold mb-4">👋 Welcome, Farmer!</h2>
      <div className="grid grid-cols-1 sm:grid-col-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md p-5 rounded-lg flex items-center gap-4 border-l-4 border-green-500"
          >
            {item.icon}
            <div>
              <p>{item.title}</p>
              <h4>{item.value}</h4>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 flex-wrap">
        <a
          href="/farmer/add-product"
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          <FaPlusCircle />
          Add Product
        </a>
        <a
          href="/farmer/orders"
          className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          <FaEye />
          View Orders
        </a>
      </div>
    </section>
  );
};
export default FarmerDashboardHome;
