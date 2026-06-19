import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Inventario from "./pages/Inventario";
import Servicios from "./pages/Servicios";
import Publicidad from "./pages/Publicidad";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/publicidad" element={<Publicidad />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;