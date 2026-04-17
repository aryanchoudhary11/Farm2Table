import { Package, ClipboardList, Wallet, Plus, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import API from "../api";

const statConfig = [
  {
    key: "totalProducts",
    title: "Total products",
    icon: Package,
    format: (v) => v,
    accent: "bg-green-50",
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
  },
  {
    key: "totalOrders",
    title: "Orders received",
    icon: ClipboardList,
    format: (v) => v,
    accent: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    key: "walletBalance",
    title: "Wallet balance",
    icon: Wallet,
    format: (v) => `₹${v}`,
    accent: "bg-amber-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
  },
];

const user = JSON.parse(localStorage.getItem("user") || "{}");

const FarmerDashboardHome = () => {
  const [statsData, setStatsData] = useState({
    totalProducts: 0,
    totalOrders: 0,
    walletBalance: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await API.get("/api/farmer", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStatsData({
          totalProducts: data.totalProducts ?? 0,
          totalOrders: data.totalOrders ?? 0,
          walletBalance: data.walletBalance ?? 0,
        });
      } catch (err) {
        console.error("Error fetching dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <section className="py-8 mt-10">
      {/* Greeting */}
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest uppercase text-green-600 mb-1">
          Dashboard
        </p>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}!
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Here's what's happening with your farm today.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {statConfig.map(
          ({ key, title, icon: Icon, format, accent, iconBg, iconColor }) => (
            <div
              key={key}
              className={`${accent} rounded-2xl p-5 flex items-center gap-4`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}
              >
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">{title}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loading ? "—" : format(statsData[key])}
                </p>
              </div>
            </div>
          ),
        )}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
          Quick actions
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="/farmer/add-product"
            className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add product
          </a>
          <a
            href="/farmer/orders"
            className="flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            View orders
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/farmer/my-products"
            className="flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            My products
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/farmer/orders"
            className="flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Track Orders
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FarmerDashboardHome;
