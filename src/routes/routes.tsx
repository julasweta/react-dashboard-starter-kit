import { DashboardPage } from "../modules";
import { AuthPage, ProfilePage, NotFoundPage } from "../pages";

export const publicRoutes = [
  { path: "/login", element: <AuthPage /> },
];

export const privateRoutes = [
  { path: "/", element: <DashboardPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "*", element: <div><NotFoundPage/></div> },
];
