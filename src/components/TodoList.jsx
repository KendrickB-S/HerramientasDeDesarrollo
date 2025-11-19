import React, { useState, useEffect } from "react";

export default function TodoList() {
  // 1. Estado para la lista de tareas y el input
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  // 2. Cargar tareas desde localStorage al iniciar
  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem("mi-todo-list")) || [];
    setTareas(guardadas);
  }, []);

  // 3. Guardar en localStorage cada vez que cambien las tareas
  useEffect(() => {
    localStorage.setItem("mi-todo-list", JSON.stringify(tareas));
  }, [tareas]);

  // Función: Agregar tarea
  const agregarTarea = (e) => {
    e.preventDefault(); // Evita que se recargue la página
    if (!nuevaTarea.trim()) return;

    const tareaObj = {
      id: Date.now(),
      texto: nuevaTarea,
      completada: false,
    };

    setTareas([tareaObj, ...tareas]); // Agrega la nueva al principio
    setNuevaTarea(""); // Limpia el input
  };

  // Función: Marcar como completada/pendiente
  const toggleCompletada = (id) => {
    const tareasActualizadas = tareas.map((t) =>
      t.id === id ? { ...t, completada: !t.completada } : t
    );
    setTareas(tareasActualizadas);
  };

  // Función: Eliminar tarea
  const borrarTarea = (id) => {
    const tareasFiltradas = tareas.filter((t) => t.id !== id);
    setTareas(tareasFiltradas);
  };

  // Calcular tareas pendientes
  const pendientes = tareas.filter(t => !t.completada).length;

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="text-center text-primary mb-4">📝 Mis Tareas</h2>
      
      {/* Formulario de entrada */}
      <form onSubmit={agregarTarea} className="b-flex gap-2 mb-4 shadow-sm p-3 bg-white rounded">
        <input
          type="text"
          className="form-control"
          placeholder="¿Qué tienes que hacer hoy?"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
        />
        <button type="submit" className="btn btn-success">
          Agregar
        </button>
      </form>

      {/* Contador de pendientes */}
      <div className="b-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">
          {pendientes === 0 ? "¡Todo al día! 🎉" : `Tienes ${pendientes} tareas pendientes`}
        </span>
        {tareas.length > 0 && (
          <button 
            className="btn btn-sm btn-outline-danger" 
            onClick={() => { if(window.confirm('¿Borrar todas?')) setTareas([]) }}
          >
            Borrar todo
          </button>
        )}
      </div>

      {/* Lista de tareas */}
      <ul className="list-group shadow-sm">
        {tareas.length === 0 && (
          <li className="list-group-item text-center text-muted p-4">
            No hay tareas. ¡Agrega una arriba!
          </li>
        )}
        
        {tareas.map((tarea) => (
          <li 
            key={tarea.id} 
            className={`list-group-item b-flex justify-content-between align-items-center ${tarea.completada ? 'bg-light' : ''}`}
          >
            <div 
              onClick={() => toggleCompletada(tarea.id)} 
              style={{ cursor: "pointer", flexGrow: 1, display: "flex", alignItems: "center", gap: "10px" }}
            >
              {/* Checkbox visual (simulado) */}
              <span style={{ fontSize: "1.2rem" }}>
                {tarea.completada ? "✅" : "pendiente:"}
              </span>
              
              <span style={{ 
                textDecoration: tarea.completada ? "line-through" : "none",
                color: tarea.completada ? "#adb5bd" : "#212529",
                fontSize: "1.1rem"
              }}>
                {tarea.texto}
              </span>
            </div>

            <button 
              className="btn btn-outline-danger btn-sm rounded-circle" 
              style={{ width: "32px", height: "32px", padding: 0 }}
              onClick={() => borrarTarea(tarea.id)}
              title="Eliminar"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}