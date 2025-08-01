
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function AuthPage() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleLogin = () => {
    login("fake_token");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-2xl mb-4">Login</h1>
        <input className="w-full border p-2 mb-4" placeholder="Email" />
        <input className="w-full border p-2 mb-4" placeholder="Password" type="password" />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
