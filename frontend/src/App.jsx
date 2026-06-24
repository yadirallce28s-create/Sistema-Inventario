import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Inventario from "./pages/inventario/Inventario";
import Proveedores from "./pages/inventario/Proveedores";
import AlertasStock from "./pages/inventario/AlertasStock";
import Servicios from "./pages/Servicio/Servicios";
import Publicidad from "./pages/publicidad/Publicidad";
import Clientes from "./pages/cliente/Clientes";
import Mascotas from "./pages/mascota/Mascotas";
import Citas from "./pages/cita/Citas";
import MainLayout from "./layout/MainLayout";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/inventario"
          element={
            <MainLayout>
              <Inventario />
            </MainLayout>
          }
        />

        <Route
          path="/servicios"
          element={
            <MainLayout>
              <Servicios />
            </MainLayout>
          }
        />

        <Route
          path="/publicidad"
          element={
            <MainLayout>
              <Publicidad />
            </MainLayout>
          }
        />
        <Route
          path="/clientes"
          element={
            <MainLayout>
              <Clientes />
            </MainLayout>
          }
        />
        <Route
          path="/alertas-stock"
          element={
            <MainLayout>
              <AlertasStock />
            </MainLayout>
          }
        />

        <Route
          path="/proveedores"
          element={
            <MainLayout>
              <Proveedores />
            </MainLayout>
          }
        />
        <Route
          path="/mascotas"
          element={
            <MainLayout>
              <Mascotas />
            </MainLayout>
          }
        />
        <Route
          path="/citas"
          element={
            <MainLayout>
              <Citas />
            </MainLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;