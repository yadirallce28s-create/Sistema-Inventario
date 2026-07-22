const API_URL = import.meta.env.VITE_API_URL;
const getToken = () => localStorage.getItem("token");

// Wrapper de fetch: agrega el token y maneja sesión expirada/ inválida
export const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Si el token no es válido o expiró, saca al usuario al login
  if (response.status === 401 || response.status === 403) {
    const data = await response.json().catch(() => ({}));

    if (
      data.message === "Token no proporcionado" ||
      data.message === "Token inválido o expirado"
    ) {
      localStorage.removeItem("usuario");
      localStorage.removeItem("token");
      window.location.href = "/";
      return null;
    }

    // Si es un 403 por rol (no por token), dejamos que el componente lo maneje
    return data;
  }

  return await response.json();
};

export default apiFetch;