import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

// 📊 Datos de ejemplo 
const data = [
  { name: "Enero", usuarios: 400, ventas: 240 },
  { name: "Febrero", usuarios: 300, ventas: 139 },
  { name: "Marzo", usuarios: 200, ventas: 980 },
  { name: "Abril", usuarios: 278, ventas: 390 },
  { name: "Mayo", usuarios: 189, ventas: 480 }
];

const dataPie = [
  { name: "Chrome", value: 55 },
  { name: "Firefox", value: 20 },
  { name: "Edge", value: 15 },
  { name: "Otros", value: 10 }
];