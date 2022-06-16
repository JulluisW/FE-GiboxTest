import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const token = localStorage.getItem("token");
  const user = { loggedIn: false };
  if(token === 'Masuk') {
    user.loggedIn = true
  }
  return user && user.loggedIn;
};

export function ProtectedRoutes() {
  const isAuth = useAuth()

  return isAuth ? <Outlet /> : <Navigate to="/login" />
}
