import {
  PieChart as RePieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import type { PieLabelRenderProps } from "recharts";
import { useThemeStore } from "../../store";

interface PieChartProps<T> {
  data: T[];
  nameKey: keyof T;
  valueKey: keyof T;
  colors?: string[];
  title?: string;
}

const defaultColors = [
  "#4F46E5",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#FBBF24",
];

export default function PieChart<T>({
  data,
  nameKey,
  valueKey,
  colors = defaultColors,
  title = "Pie Chart",
}: PieChartProps<T>) {
  const { theme } = useThemeStore();

  return (
    <div
      className={`p-4 rounded shadow ${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        }`}
    >
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <RePieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            dataKey={valueKey as string}
            nameKey={nameKey as string}
            label={(entry: PieLabelRenderProps) => {
              const payload = entry.payload as T;
              return String(payload[nameKey]);
            }}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );
}


