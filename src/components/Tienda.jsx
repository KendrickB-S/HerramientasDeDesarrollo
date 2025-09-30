import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Tienda() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("all");

  // Cargar carrito desde localStorage
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Obtener productos y categorías de la API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        const cats = ["all", ...new Set(data.map((p) => p.category))];
        setCategorias(cats);
      })
      .catch((error) => console.error("Error cargando productos:", error));
  }, []);

  // Filtrar productos
  const productosFiltrados =
    categoriaSeleccionada === "all"
      ? productos
      : productos.filter((p) => p.category === categoriaSeleccionada);

  // Agregar producto al carrito con cantidad
  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);
    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  // Eliminar producto del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  // Cambiar cantidad
  const cambiarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(id);
    } else {
      setCarrito(
        carrito.map((item) =>
          item.id === id ? { ...item, cantidad: nuevaCantidad } : item
        )
      );
    }
  };

  // Calcular total
  const total = carrito.reduce((sum, item) => sum + item.price * item.cantidad, 0);

  const checkout = () => {
    alert(" ¡Compra realizada con éxito!");
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