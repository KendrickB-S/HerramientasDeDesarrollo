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


}