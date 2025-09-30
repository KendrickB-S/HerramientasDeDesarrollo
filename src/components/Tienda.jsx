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
    <div className="container my-4">
      <h2 className="mb-4"> Mini Tienda Avanzada</h2>

      {/* Filtro por categoría */}
      <div className="mb-3">
        <label className="form-label">Filtrar por categoría:</label>
        <select
          className="form-select"
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        >
          {categorias.map((cat, i) => (
            <option key={i} value={cat}>
              {cat === "all" ? "Todas" : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de productos */}
      <div className="row">
        {productosFiltrados.map((producto) => (
          <div key={producto.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={producto.image}
                alt={producto.title}
                className="card-img-top"
                style={{ height: "200px", objectFit: "contain" }}
              />
              <div className="card-body d-flex flex-column">
                <h6 className="card-title">{producto.title}</h6>
                <p className="text-muted">${producto.price.toFixed(2)}</p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => agregarAlCarrito(producto)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr />

      {/* Carrito */}
      <h3> Carrito</h3>
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    value={item.cantidad}
                    min="1"
                    onChange={(e) =>
                      cambiarCantidad(item.id, parseInt(e.target.value))
                    }
                    className="form-control"
                    style={{ width: "80px" }}
                  />
                </td>
                <td>${(item.price * item.cantidad).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarDelCarrito(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h4>Total: ${total.toFixed(2)}</h4>
      {carrito.length > 0 && (
        <button className="btn btn-success" onClick={checkout}>
          Finalizar compra
        </button>
      )}
    </div>
  );
}

export default Tienda;