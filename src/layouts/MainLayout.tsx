import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Header from "../components/Header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuthStore();

  return (
    <div className="flex h-screen flex-col">
      <Header/>

      <div className="flex flex-row flex-1">
        <aside className="w-60 bg-gray-800 text-white p-4">
          <h2 className="text-xl font-bold mb-6">Dashboard</h2>
          <nav className="flex flex-col gap-2">
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
          </nav>
          <button onClick={logout} className="mt-auto text-red-400">
            Logout
          </button>
        </aside>
        <main className="flex-1 bg-gray-100 p-6">{children}</main>
      </div>
    </div>
  );
}
