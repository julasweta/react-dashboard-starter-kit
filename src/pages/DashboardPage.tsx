import { useState } from "react";
import { Table, ModalForm } from "../modules/dashboard";
import { BarChart, PieChart } from "../modules/charts";
import type { IUser } from "../interfaces/IUser";

/**
 * DashboardPage component with user management, bar and pie charts.
 * 
 * NOTE:
 * - You can change the data arrays (dataTable, dataBar, dataPie) — both keys and values — to update the displayed content.
 * - However, DO NOT RENAME the arrays themselves (dataTable, dataBar, dataPie), 
 *   as some internal logic depends on these specific names.
 * - Changing the array names may break component functionality.
 */


/* DO NOT RENAME  the array */
const dataTable: IUser[] = [
  { id: 1, name: "John Doe", email: "john@mail.com", role: "Admin", state: "active" },
  { id: 2, name: "Jane Smith", email: "jane@mail.com", role: "User", state: "inactive" },
];

/* DO NOT RENAME  the array */
const dataBar = [
  { name: 'Січень', meat: 4000, expenses: 2400, profit: 1600 },
  { name: 'Лютий', meat: 3000, expenses: 1398, profit: 1602 },
  { name: 'Березень', meat: 2000, expenses: 980, profit: 1020 },
  { name: 'Квітень', meat: 2780, expenses: 3908, profit: -1128 },
  { name: 'Травень', meat: 1890, expenses: 4800, profit: -2910 },
  { name: 'Червень', meat: 2390, expenses: 3800, profit: -1410 },
  { name: 'Липень', meat: 3490, expenses: 4300, profit: -810 },
];

/* DO NOT RENAME the array */
const dataPie = [
  { device: "Desktop", count: 400 },
  { device: "Mobile", count: 300 },
  { device: "Tablet", count: 100 },
];

const dataKeys = dataBar.length > 0
  ? Object.keys(dataBar[0]).filter(key => key !== "name")
  : [];



export default function DashboardPage() {
  const [data, setData] = useState<IUser[]>(dataTable);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);

  const handleAdd = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  const handleEdit = (user: IUser) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSave = (user: IUser) => {
    if (user.id) {
      setData((prev) => prev.map((item) => (item.id === user.id ? user : item)));
    } else {
      setData((prev) => [...prev, { ...user, id: Date.now() }]);
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>

      <Table data={data} onEdit={handleEdit} onDelete={handleDelete} idKey="id" />
      {isModalOpen && (
        <ModalForm<IUser>
          onClose={() => setModalOpen(false)}
          onSave={(user) => handleSave(user)}
          initialData={editingUser}
        />

      )}


      <BarChart
        data={dataBar}
        dataKeys={dataKeys as (keyof typeof dataBar[0])[]}
        colors={["#8884d8", "#82ca9d", "#ff7300"]}
        xDataKey="name"
        title="Фінансові показники"
      />

      <PieChart
        data={dataPie}
        nameKey="device"
        valueKey="count"
        title="Traffic by Device"
      />

    </div>
  );
}
