// src/components/Calculadora.js
import React, { useState } from "react";
import "./Calculadora.css"; // estilos personalizados

function Calculadora() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [resultado, setResultado] = useState(null);

  const handleCalcular = (operacion) => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      setResultado("⚠️ Ingresa números válidos");
      return;
    }

    switch (operacion) {
      case "+":
        setResultado(n1 + n2);
        break;
      case "-":
        setResultado(n1 - n2);
        break;
      case "*":
        setResultado(n1 * n2);
        break;
      case "/":
        setResultado(n2 !== 0 ? n1 / n2 : " No se puede dividir entre 0");
        break;
      default:
        setResultado("Operación inválida");
    }
  };

  return (
    <div className="calc-container">
      <h2 className="calc-title"> Calculadora</h2>
      <div className="inputs">
        <input
          type="number"
          className="form-control"
          placeholder="Número 1"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Número 2"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />
      </div>

      <div className="buttons">
        <button className="btn btn-primary" onClick={() => handleCalcular("+")}>➕ Suma</button>
        <button className="btn btn-secondary" onClick={() => handleCalcular("-")}>➖ Resta</button>
        <button className="btn btn-success" onClick={() => handleCalcular("*")}>✖️ Multiplicación</button>
        <button className="btn btn-danger" onClick={() => handleCalcular("/")}>➗ División</button>
      </div>

      {resultado !== null && (
        <div className="resultado">
          <span>Resultado: </span>
          <strong>{resultado}</strong>
        </div>
      )}
    </div>
  );
}

export default Calculadora;
