import { useState } from "react";
import { Table, ModalForm } from "../modules/dashboard";
import { BarChart, PieChart } from "../modules/charts";
import type { IUser } from "../interfaces/IUser";
import { Select } from "../components/ui/Select/Select";
import { FileUpload } from "../components/ui/FileUpload/FileUpload";
import { Button } from "../components/ui/Buttons/Button";
import { useThemeStore } from "../store";

/* DO NOT RENAME the arrays */
const dataTable: IUser[] = [
  { id: 1, name: "John Doe", email: "john@mail.com", role: "Admin", state: "active" },
  { id: 2, name: "Jane Smith", email: "jane@mail.com", role: "User", state: "inactive" },
];

const dataBar = [
  { name: 'Січень', meat: 4000, expenses: 2400, profit: 1600 },
  { name: 'Лютий', meat: 3000, expenses: 1398, profit: 1602 },
  { name: 'Березень', meat: 2000, expenses: 980, profit: 1020 },
  { name: 'Квітень', meat: 2780, expenses: 3908, profit: -1128 },
  { name: 'Травень', meat: 1890, expenses: 4800, profit: -2910 },
  { name: 'Червень', meat: 2390, expenses: 3800, profit: -1410 },
  { name: 'Липень', meat: 3490, expenses: 4300, profit: -810 },
];

const dataPie = [
  { device: "Desktop", count: 400 },
  { device: "Mobile", count: 300 },
  { device: "Tablet", count: 100 },
];

const dataForAddUser: IUser = {
  name: "",
  email: "",
  role: "",
  state: "inactive",
}

const dataKeys = dataBar.length > 0
  ? Object.keys(dataBar[0]).filter(key => key !== "name")
  : [];

 

export default function DashboardPage() {
  const [data, setData] = useState<IUser[]>(dataTable);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenAddUser, setModalOpenAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [selectedValue, setSelectedValue] = useState("");

  const { theme } = useThemeStore();

  const handleAdd = () => {
    setEditingUser(null);
    setModalOpenAddUser(true);
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
    if (isModalOpenAddUser) {
      setModalOpenAddUser(false);
    }

    setModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users</h1>
        <Button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add User
        </Button>
      </div>

      <Table data={data} onEdit={handleEdit} onDelete={handleDelete} idKey="id" />

      {isModalOpen && (
        <ModalForm<IUser>
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          initialData={editingUser}
        />
      )}

      {isModalOpenAddUser && (
        <ModalForm<IUser>
          onClose={() => setModalOpenAddUser(false)}
          onSave={handleSave}
          initialData={dataForAddUser}
          title="Add User"
        />
      )}

      <div className="w-full overflow-x-auto">
        <BarChart
          data={dataBar}
          dataKeys={dataKeys as (keyof typeof dataBar[0])[]}
          colors={["#8884d8", "#82ca9d", "#ff7300"]}
          xDataKey="name"
          title="Фінансові показники"
        />
      </div>

      <div className="w-full overflow-x-auto">
        <PieChart
          data={dataPie}
          nameKey="device"
          valueKey="count"
          title="Traffic by Device"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3>Select Option</h3>
        <Select
          options={[
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
          ]}
          value={selectedValue}
          onChange={setSelectedValue}
        />
      </div>

      {/* ✅ FileUpload тепер завжди видно */}
      <div className={`w-full mt-4 p-2 border rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm h-78`}>
        <FileUpload
          multiple
          accept="image/*,.pdf"
          maxSizeMB={10}
          onFilesSelected={(files) => console.log("Selected:", files)}
        />
      </div>
    </div>
  );
}
