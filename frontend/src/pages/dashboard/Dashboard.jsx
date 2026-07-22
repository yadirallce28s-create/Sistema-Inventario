import "../../css/dashboard.css";
import { useEffect, useState } from "react";
import VentasChart from "../../components/charts/VentasChart";
import ProductosChart from "../../components/charts/ProductosChart";
import IngresosChart from "../../components/charts/IngresosChart";
import TopProductosChart from "../../components/charts/TopProductosChart";

import {
  MdGroups,
  MdPets,
  MdInventory2,
  MdPointOfSale,
  MdWarningAmber,
  MdAttachMoney
} from "react-icons/md";

function Dashboard() {

  const [dashboard, setDashboard] = useState({
    clientes: 0,
    mascotas: 0,
    productos: 0,
    ventas: 0,
    stockBajo: 0,
    ingresos: 0,
    productosStock: [],
    ultimosClientes: [],
    graficoVentas: [],
    graficoCategorias: [],
    graficoIngresos: [],
    topProductos: [],
  });

  useEffect(() => {
    obtenerDashboard();
  }, []);

  const obtenerDashboard = async () => {
    try {
      const response = await fetch("https://sistema-inventario-95aj.onrender.com/api/dashboard");
      const data = await response.json();
      setDashboard(data.dashboard);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>

      {/* HEADER */}
      <div className="dashboard-header">
        <h1>📊 Panel de Control</h1>
        <p>Bienvenido al sistema veterinario DokyPets</p>
      </div>

      {/* CARDS */}
      <div className="dashboard-cards">

        <div className="card-dashboard card-clientes">
          <h3>👥 Clientes</h3>
          <h1>{dashboard.clientes}</h1>
        </div>

        <div className="card-dashboard card-mascotas">
          <h3>🐾 Mascotas</h3>
          <h1>{dashboard.mascotas}</h1>
        </div>

        <div className="card-dashboard card-productos">
          <h3>📦 Productos</h3>
          <h1>{dashboard.productos}</h1>
        </div>

        <div className="card-dashboard card-ventas">
          <h3>💰 Ventas</h3>
          <h1>{dashboard.ventas}</h1>
        </div>

        <div className="card-dashboard card-stock">
          <h3>🚨 Stock Bajo</h3>
          <h1>{dashboard.stockBajo}</h1>
        </div>

        <div className="card-dashboard card-ingresos">
          <h3>💵 Ingresos</h3>
          <h1>S/. {Number(dashboard.ingresos).toFixed(2)}</h1>
        </div>

      </div>

      {/* GRID PRODUCTOS STOCK + CLIENTES */}
      <div className="dashboard-grid">

        {/* PRODUCTOS STOCK BAJO */}
        <div className="dashboard-panel">
          <h2>📦 Productos con bajo stock</h2>

          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Stock</th>
              </tr>
            </thead>

            <tbody>
              {dashboard.productosStock.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>
                    <span className="stock-bajo">{producto.stock}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ÚLTIMOS CLIENTES */}
        <div className="dashboard-panel">
          <h2>👥 Últimos clientes</h2>

          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
              </tr>
            </thead>

            <tbody>
              {dashboard.ultimosClientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.nombre} {cliente.apellido}</td>
                  <td>{cliente.telefono}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* GRÁFICOS */}
      <div className="dashboard-charts">

        <div className="chart-card">
          <h2>📈 Ventas Mensuales</h2>
          <VentasChart datos={dashboard.graficoVentas || []} />
        </div>

        <div className="chart-card">
          <h2>📦 Productos por Categoría</h2>
          <ProductosChart datos={dashboard.graficoCategorias || []} />
        </div>

        <div className="chart-card">
          <h2>💰 Ingresos Mensuales</h2>
          <IngresosChart datos={dashboard.graficoIngresos || []} />
        </div>

        <div className="chart-card">
          <h2>🏆 Productos Más Vendidos</h2>
          <TopProductosChart datos={dashboard.topProductos || []} />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;