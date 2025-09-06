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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Estadisticas() {
  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">📊 Estadísticas</h2>

      <div className="row">
        {/* Gráfico de Barras */}
        <div className="col-md-6">
          <h5 className="text-center">Usuarios y Ventas</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="usuarios" fill="#8884d8" />
              <Bar dataKey="ventas" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Gráfico Circular */}
        <div className="col-md-6">
          <h5 className="text-center">Uso de Navegadores</h5>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataPie}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                dataKey="value"
                label
              >
                {dataPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}