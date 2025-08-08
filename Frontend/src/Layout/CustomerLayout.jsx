import { Outlet } from "react-router-dom";
const CustomerLayout = () => {
  return (
    <main className="flex-1 p-6 bg-gray-50">
      <Outlet />
    </main>
  );
};
export default CustomerLayout;
