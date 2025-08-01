import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/routes";
import MainLayout from "./layouts/MainLayout";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

export default function App() {
  const { token } = useAuthStore();
  const { theme } = useThemeStore();

  return (
   
    <div className={theme}>
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <Routes>
          {/* Публічні маршрути */}
          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          {/* Приватні маршрути */}
          {privateRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={
                token ? (
                  <MainLayout>{element}</MainLayout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          ))}
        </Routes>
      </div>
    </div>
  );
}
