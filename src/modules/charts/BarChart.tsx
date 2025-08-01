import React from "react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useThemeStore } from "../../store";

interface BarChartProps<T> {
  data?: T[];
  dataKeys?: (keyof T)[];
  colors?: string[];
  xDataKey?: keyof T;
  title?: string;
}

export default function BarChart<T extends Record<string, any>>({
  data = [],
  dataKeys = [],
  colors = [],
  xDataKey = "name" as keyof T,
  title = "Bar Chart",
}: BarChartProps<T>) {
  const { theme } = useThemeStore();

  const axisColor = React.useMemo(() => (theme === "dark" ? "#e5e7eb" : "#374151"), [theme]);
  const gridColor = React.useMemo(() => (theme === "dark" ? "#4b5563" : "#d1d5db"), [theme]);
  const tooltipStyle = React.useMemo(() => ({
    backgroundColor: theme === "dark" ? "#1f2937" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
  }), [theme]);

  // Примусовий ключ для перерендеру графіка
  const chartKey = React.useMemo(() => `chart-${theme}`, [theme]);

  return (
    <div
      className={`p-4 rounded shadow ${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        }`}
    >

      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ReBarChart data={data} key={chartKey}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey={xDataKey as string} stroke={axisColor} />
          <YAxis stroke={axisColor} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ color: axisColor }} />
          {dataKeys.map((key, index) => (
            <Bar
              key={String(key)}
              dataKey={key as string}
              fill={colors[index] || (theme === "dark" ? "#60a5fa" : "#8884d8")}
              name={String(key)}
            />
          ))}
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
}
