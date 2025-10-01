import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Gastos() {
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [restante, setRestante] = useState(0);

   // ---- Cargar datos desde localStorage
  useEffect(() => {
    const presupuestoGuardado = JSON.parse(localStorage.getItem("presupuesto")) || 0;
    const gastosGuardados = JSON.parse(localStorage.getItem("gastos")) || [];

    setPresupuesto(presupuestoGuardado);
    setGastos(gastosGuardados);
  }, []);

  // ---- Guardar en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("presupuesto", JSON.stringify(presupuesto));
    localStorage.setItem("gastos", JSON.stringify(gastos));
    calcularRestante();
  }, [presupuesto, gastos]);
  
 // ---- Calcular restante
  const calcularRestante = () => {
    const totalGastado = gastos.reduce((sum, g) => sum + g.monto, 0);
    setRestante(presupuesto - totalGastado);
  };

  // ---- Manejo de agregar gasto
  const agregarGasto = (e) => {
    e.preventDefault();
    if (!descripcion || !monto) {
      alert("Por favor completa todos los campos");
      return;
    }
    const nuevoGasto = {
      id: Date.now(),
      descripcion,
      monto: parseFloat(monto),
    };
    setGastos([...gastos, nuevoGasto]);
    setDescripcion("");
    setMonto("");
  };

}