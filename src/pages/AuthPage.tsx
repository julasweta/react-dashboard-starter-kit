import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LoginForm } from "../modules/auth/LoginForm";

export default function AuthPage() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    // Тестова авторизація — для входу вводьте будь-які дані
    login("fake_token");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}

