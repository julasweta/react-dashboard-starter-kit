import type { ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger";
  children: ReactNode;
}

export const Button = ({
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  children,
}: ButtonProps) => {
  const baseStyles =
    "px-4 py-2 rounded transition flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      )}
      {children}
    </button>
  );
};
