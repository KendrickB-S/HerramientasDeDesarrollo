import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {PieChart,Pie,Cell,Tooltip,BarChart,Bar,XAxis,YAxis,CartesianGrid,Legend,} from "recharts";

// Colores para las categorías
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4444"];

function App() {
  const [presupuesto, setPresupuesto] = useState(
    () => JSON.parse(localStorage.getItem("presupuesto")) || 0
  );
  const [gastos, setGastos] = useState(
    () => JSON.parse(localStorage.getItem("gastos")) || []
  );
  const [nuevoGasto, setNuevoGasto] = useState({
    descripcion: "",
    monto: "",
    categoria: "Comida",
  });

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("presupuesto", JSON.stringify(presupuesto));
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }, [presupuesto, gastos]);

  // Calcular totales
  const totalGastado = gastos.reduce((acc, g) => acc + Number(g.monto), 0);
  const restante = presupuesto - totalGastado;

  // Manejar formulario
  const handleChange = (e) => {
    setNuevoGasto({ ...nuevoGasto, [e.target.name]: e.target.value });
  };

  const agregarGasto = (e) => {
    e.preventDefault();
    if (!nuevoGasto.descripcion || !nuevoGasto.monto) return;
    setGastos([...gastos, { ...nuevoGasto, monto: Number(nuevoGasto.monto) }]);
    setNuevoGasto({ descripcion: "", monto: "", categoria: "Comida" });
  };

  // Agrupar gastos por categoría
  const categorias = gastos.reduce((acc, g) => {
    acc[g.categoria] = (acc[g.categoria] || 0) + g.monto;
    return acc;
  }, {});

  const dataGrafico = Object.keys(categorias).map((cat, index) => ({
    name: cat,
    value: categorias[cat],
  }));

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Gestor de Gastos Personales</h1>

      {/* Presupuesto */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Presupuesto: S/. {presupuesto}</h2>
        <input
          type="number"
          placeholder="Definir presupuesto"
          onChange={(e) => setPresupuesto(Number(e.target.value))}
        />
        <p>Total gastado: <b>S/. {totalGastado}</b></p>
        <p>Restante: <b style={{ color: restante < 0 ? "red" : "green" }}>S/. {restante}</b></p>
      </div>

      {/* Formulario de gasto */}
      <form onSubmit={agregarGasto} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={nuevoGasto.descripcion}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="monto"
          placeholder="Monto"
          value={nuevoGasto.monto}
          onChange={handleChange}
          required
        />
        <select
          name="categoria"
          value={nuevoGasto.categoria}
          onChange={handleChange}
        >
          <option value="Comida">Comida</option>
          <option value="Transporte">Transporte</option>
          <option value="Vivienda">Vivienda</option>
          <option value="Ocio">Ocio</option>
          <option value="Otros">Otros</option>
        </select>
        <button type="submit">Agregar gasto</button>
      </form>

      {/* Lista de gastos */}
      <h3>Lista de gastos</h3>
      <ul>
        {gastos.map((g, i) => (
          <li key={i}>
            {g.descripcion} - S/. {g.monto} ({g.categoria})
          </li>
        ))}
      </ul>

      {/* Gráfico circular */}
      <h3>Distribución de gastos</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={dataGrafico}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {dataGrafico.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      {/* Gráfico de barras */}
      <h3>Gastos por categoría</h3>
      <BarChart width={500} height={300} data={dataGrafico}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}

export default App;