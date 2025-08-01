import { useThemeStore } from "../../store";

interface TableProps<T> {
  data: T[];
  onEdit: (item: T) => void;
  onDelete: (id: number) => void;
  idKey: keyof T;
}


export default function Table<T extends Record<string, any>>({
  data,
  onEdit,
  onDelete,
  idKey,
}: TableProps<T>) {
  const { theme } = useThemeStore();

  if (data.length === 0) return <p className="p-4 text-center">No data</p>;

  const columns = Object.keys(data[0]);

  return (
    <table
      className={`min-w-full border rounded-md overflow-hidden ${theme === "dark" ? "border-gray-700" : "border-gray-300"
        }`}
    >
      <thead className={theme === "dark" ? "bg-gray-900" : "bg-gray-100"}>
        <tr>
          {columns.map((col) => (
            <th
              key={col}
              className={`text-left px-6 py-3 text-sm font-semibold border-b ${theme === "dark"
                  ? "text-gray-300 border-gray-700"
                  : "text-gray-700 border-gray-300"
                }`}
            >
              {col}
            </th>
          ))}
          <th
            className={`px-6 py-3 text-sm font-semibold border-b ${theme === "dark"
                ? "text-gray-300 border-gray-700"
                : "text-gray-700 border-gray-300"
              }`}
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={row[idKey] as string | number}
            className={
              theme === "dark"
                ? `${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"} hover:bg-gray-600`
                : `${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200`
            }
          >
            {columns.map((col) => (
              <td
                key={col}
                className={`px-6 py-3 text-sm border-b ${theme === "dark"
                    ? "text-gray-100 border-gray-700"
                    : "text-gray-900 border-gray-300"
                  }`}
              >
                {row[col]}
              </td>
            ))}
            <td
              className={`px-6 py-3 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-300"
                }`}
            >
              <button
                onClick={() => onEdit(row)}
                className="mr-3 text-blue-600 hover:text-blue-800 focus:outline-none focus:underline"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(row[idKey] as number)}
                className="text-red-600 hover:text-red-800 focus:outline-none focus:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  );
}
