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

  //----Eliminar gasto
  const eliminarGasto = (id) => {
    setGastos(gastos.filter((g) => g.id !== id));
  };

  // ---- reiniciar todo
  const reiniciar = () => {
    if (window.confirm("¿Estás seguro de reiniciar el presupuesto y gastos?")) {
        setPresupuesto(0);
        setGastos([]);
        localStorage.removeItem("presupuesto");
        localStorage.removeItem("gastos");
    }
};

 return (
    <div className="container my-4">
      <h2 className="text-center">Gestor de Gastos Personales</h2>

      {/* Definir presupuesto */}
      {presupuesto === 0 ? (
        <div className="card p-3 shadow mt-4">
          <h4>Definir presupuesto inicial</h4>
          <input
            type="number"
            className="form-control my-2"
            placeholder="Ingresa tu presupuesto"
            onChange={(e) => setPresupuesto(parseFloat(e.target.value))}
          />
        </div>
      ) : (
        <>
          {/* Resumen */}
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="card p-3 bg-primary text-white shadow">
                <h5>Presupuesto</h5>
                <h3>${presupuesto.toFixed(2)}</h3>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 bg-warning text-dark shadow">
                <h5>Gastado</h5>
                <h3>
                  ${gastos.reduce((sum, g) => sum + g.monto, 0).toFixed(2)}
                </h3>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className={`card p-3 shadow ${
                  restante < 0 ? "bg-danger text-white" : "bg-success text-white"
                }`}
              >
                <h5>Restante</h5>
                <h3>${restante.toFixed(2)}</h3>
              </div>
            </div>
          </div>
           {/* Formulario gasto */}
          <div className="card p-3 shadow mt-4">
            <h4>Agregar gasto</h4>
            <form onSubmit={agregarGasto}>
              <input
                type="text"
                className="form-control my-2"
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
              <input
                type="number"
                className="form-control my-2"
                placeholder="Monto"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
              />
              <button className="btn btn-primary">Agregar</button>
            </form>
          </div>

          {/* Lista de gastos */}
          <div className="card p-3 shadow mt-4">
            <h4>Lista de gastos</h4>
            {gastos.length === 0 ? (
              <p>No hay gastos aún.</p>
            ) : (
              <ul className="list-group">
                {gastos.map((g) => (
                  <li
                    key={g.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {g.descripcion} - ${g.monto.toFixed(2)}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarGasto(g.id)}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Botón reiniciar */}
          <div className="text-center mt-4">
            <button className="btn btn-outline-danger" onClick={reiniciar}>
              Reiniciar todo
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Gastos;