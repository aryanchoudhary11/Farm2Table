import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, PlusCircle, Package, Truck } from "lucide-react";

const FarmerLayout = () => {
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-green-200"
    }`;

  return (
    <div className="min-h-screen flex">
      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default FarmerLayout;
