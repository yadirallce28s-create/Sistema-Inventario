import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import Dashboard from "./pages/dashboard/Dashboard";

import Clientes from "./pages/cliente/Clientes";
import Mascotas from "./pages/mascota/Mascotas";
import Citas from "./pages/cita/Citas";
import Ventas from "./pages/ventas/ventas";
import Servicios from "./pages/servicio/Servicios";
import Publicidad from "./pages/publicidad/Publicidad";

import Productos from "./pages/inventario/Productos";
import Alertas from "./pages/inventario/Alertas";
import Proveedores from "./pages/inventario/Proveedores";

import MainLayout from "./layout/MainLayout";
import InventarioLayout from "./layout/InventarioLayout";
import RutaProtegida from "./components/RutaProtegida";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <RutaProtegida
              roles={["admin", "veterinario", "asistente"]}
            >
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </RutaProtegida>
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

        <Route
          path="/ventas"
          element={
            <RutaProtegida
              roles={["admin", "asistente"]}
            >
              <MainLayout>
                <Ventas />
              </MainLayout>
            </RutaProtegida>
          }
        />

        <Route
          path="/servicios"
          element={
            <RutaProtegida
              roles={["admin", "veterinario"]}
            >
              <MainLayout>
                <Servicios />
              </MainLayout>
            </RutaProtegida>
          }
        />

        <Route
          path="/publicidad"
          element={
            <RutaProtegida
              roles={["admin"]}
            >
              <MainLayout>
                <Publicidad />
              </MainLayout>
            </RutaProtegida>
          }
        />

        {/* INVENTARIO */}

        <Route
          path="/inventario"
          element={
            <RutaProtegida
              roles={["admin", "asistente"]}
            >
              <MainLayout>
                <InventarioLayout />
              </MainLayout>
            </RutaProtegida>
          }
        >

          <Route
            path="productos"
            element={<Productos />}
          />

          <Route
            path="alertas"
            element={<Alertas />}
          />

          <Route
            path="proveedores"
            element={<Proveedores />}
          />

        </Route>

      </Routes>

    </BrowserRouter>

  );

}

export default App;