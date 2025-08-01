import { Navigate } from "react-router-dom";
import { DashboardPage } from "../modules";
import { AuthPage, ProfilePage, NotFoundPage } from "../pages";

export const publicRoutes = [
  { path: "/login", element: <AuthPage /> },
];

export const privateRoutes = [
  // За замовчуванням "/" буде перенаправляти на "/dashboard"
  { path: "/", element: <Navigate to="/dashboard" replace /> },

  // Головна сторінка дашборду за адресою "/dashboard"
  { path: "/dashboard", element: <DashboardPage /> },

  { path: "/profile", element: <ProfilePage /> },
  { path: "*", element: <div><NotFoundPage /></div> },
];

