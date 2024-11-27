import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    toast.error("회원정보가 없습니다! 로그인 페이지로 이동합니다.");
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
