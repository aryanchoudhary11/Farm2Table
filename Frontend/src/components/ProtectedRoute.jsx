import { Navigate, Outlet } from "react-router-dom";

const RoleProtectedLayout = ({ allowedRoles, children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/404" replace />;

  return children ? children : <Outlet />;
};

export default RoleProtectedLayout;
