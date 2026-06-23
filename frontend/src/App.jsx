import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Inventario from "./pages/Inventario";
import Servicios from "./pages/Servicios";
import Publicidad from "./pages/Publicidad";
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

      </Routes>
    </BrowserRouter>
  );
}

export default App;