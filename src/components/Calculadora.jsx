import React, { useState } from "react";

function Calculadora() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [resultado, setResultado] = useState(null);

  const handleCalcular = (operacion) => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      setResultado("Por favor ingresa números válidos");
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
        setResultado(n2 !== 0 ? n1 / n2 : "Error: División entre 0");
        break;
      default:
        setResultado("Operación inválida");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3"> Calculadora</h2>
      <div className="mb-2">
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Número 1"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Número 2"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-primary" onClick={() => handleCalcular("+")}> Sumar</button>
        <button className="btn btn-secondary" onClick={() => handleCalcular("-")}> Restar</button>
        <button className="btn btn-success" onClick={() => handleCalcular("*")}> Multiplicar</button>
        <button className="btn btn-danger" onClick={() => handleCalcular("/")}> Dividir</button>
      </div>

      {resultado !== null && (
        <div className="alert alert-info mt-3">
          <strong>Resultado: </strong> {resultado}
        </div>
      )}
    </div>
  );
}

export default Calculadora;
