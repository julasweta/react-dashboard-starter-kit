import { useState } from "react";
import { ModalForm } from "../dashboard";
import { useThemeStore } from "../../store";
import type { IUser } from "../../interfaces/IUser";

const exampleProfile: IUser = {
  id: 1,
  name: "John Doe",
  email: "john@mail.com",
  role: "Admin",
  state: "active"
};

const formatLabel = (key: string) => {
  return key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^\w/, (c) => c.toUpperCase());
};

const User = () => {
  const [profile, setProfile] = useState<IUser>(exampleProfile);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme } = useThemeStore();

  const handleSave = (data: IUser) => {
    setProfile(data);
    setIsModalOpen(false);
  };

  return (
    <div
      className={`max-w-md mx-auto p-6 rounded shadow ${theme === "dark"
          ? "bg-gray-800 text-gray-100"
          : "bg-white text-gray-900"
        }`}
    >
      <h1 className="text-2xl font-semibold mb-4">Профіль</h1>

      <div className="space-y-2">
        {Object.entries(profile).map(([key, value]) => (
          <p key={key}>
            <strong>{formatLabel(key)}:</strong> {String(value || "-")}
          </p>
        ))}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Редагувати
      </button>

      {isModalOpen && (
        <ModalForm<IUser>
          initialData={profile}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default User;


