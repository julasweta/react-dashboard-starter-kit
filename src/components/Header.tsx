import { useThemeStore } from "@/store";

export default function Header() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
      <h1 className="text-xl font-bold">My Dashboard</h1>
      <button
        onClick={toggleTheme}
        className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded"
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </header>
  );
}
