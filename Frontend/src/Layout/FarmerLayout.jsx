import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, PlusCircle, Package, Truck } from "lucide-react";

const FarmerLayout = () => {
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-green-200"
    }`;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-green-100 p-4 shadow-md">
        <nav className="flex flex-col gap-2">
          <NavLink to="/farmer" className={navLinkClasses} end>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
          <NavLink to="/farmer/add-product" className={navLinkClasses}>
            <PlusCircle size={20} />
            Add Product
          </NavLink>
          <NavLink to="/farmer/my-products" className={navLinkClasses}>
            <Package size={20} />
            My Products
          </NavLink>
          <NavLink to="/farmer/orders" className={navLinkClasses}>
            <Truck size={20} />
            Track Orders
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default FarmerLayout;
