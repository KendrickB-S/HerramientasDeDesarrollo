import React, { useEffect, useState } from "react";

function Tienda() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Obtener productos de la API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error cargando productos:", error));
  }, []);
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
  };

  const total = carrito.reduce((sum, item) => sum + item.price, 0);

  const checkout = () => {
    alert("¡Compra realizada con éxito!");
    setCarrito([]);
    localStorage.removeItem("carrito");
  };
 return (
    <div style={{ padding: "20px" }}>
      <h2>Mini Tienda</h2>

      <h3>Productos</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {productos.map((producto) => (
          <div key={producto.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <img src={producto.image} alt={producto.title} style={{ width: "100px", height: "100px", objectFit: "contain" }} />
            <h4>{producto.title}</h4>
            <p>${producto.price}</p>
            <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
          </div>
        ))}
      </div>

      <hr />

      <h3>🛒 Carrito</h3>
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {carrito.map((item, index) => (
            <li key={index}>
              {item.title} - ${item.price.toFixed(2)}{" "}
              <button onClick={() => eliminarDelCarrito(index)}>❌</button>
            </li>
          ))}
        </ul>
      )}

      <h4>Total: ${total.toFixed(2)}</h4>
      {carrito.length > 0 && <button onClick={checkout}>Finalizar compra</button>}
    </div>
  );
}

export default Tienda;