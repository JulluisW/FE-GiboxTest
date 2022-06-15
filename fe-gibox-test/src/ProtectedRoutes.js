import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const user = { loggedIn: false };
  return user && user.loggedIn;
};

export function ProtectedRoutes() {
  const isAuth = useAuth()

  return isAuth ? <Outlet /> : <Navigate to="/login" />
}
