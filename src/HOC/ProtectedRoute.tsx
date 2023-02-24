import React from "react";
import { Navigate, Route, useLocation } from "react-router-dom";

interface Props {
  path: string;
  element: React.ReactNode;
}

function checkIsLoggedIn(): boolean {
    const user = localStorage.getItem("Token");
    return !!user; 
  }

const ProtectedRoute: React.FC<Props> = ({ path, element }: Props) => {
  const isLoggedIn = checkIsLoggedIn(); // Kiểm tra người dùng đã đăng nhập hay chưa
  const location = useLocation();

  return isLoggedIn ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to='/' />
  );
};

export default ProtectedRoute;