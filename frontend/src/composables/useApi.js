// Variable base que se toma desde las variables de entorno expuestas por Vite.
const DEFAULT_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Funcion que entrega metodos basicos para consumir la API usando fetch.
const useApi = (baseUrl = DEFAULT_API_URL) => {
  // Funcion que obtiene datos desde una ruta especifica.
  const get = async (path) => {
    try {
      const response = await fetch(baseUrl + path);
      if (!response.ok) {
        throw new Error('Error al obtener datos');
      }
      return await response.json();
    } catch (error) {
      console.error('Fallo en GET', error);
      throw error;
    }
  };

  // Funcion que envia datos nuevos al servidor por medio de POST.
  const post = async (path, body) => {
    try {
      const response = await fetch(baseUrl + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error('Error al crear recurso');
      }
      return await response.json();
    } catch (error) {
      console.error('Fallo en POST', error);
      throw error;
    }
  };

  // Funcion que actualiza datos existentes mediante PUT.
  const put = async (path, body) => {
    try {
      const response = await fetch(baseUrl + path, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar recurso');
      }
      return await response.json();
    } catch (error) {
      console.error('Fallo en PUT', error);
      throw error;
    }
  };

  // Funcion que elimina un recurso usando DELETE.
  const del = async (path) => {
    try {
      const response = await fetch(baseUrl + path, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Error al eliminar recurso');
      }
      return await response.json();
    } catch (error) {
      console.error('Fallo en DELETE', error);
      throw error;
    }
  };

  return { get, post, put, del };
};

export default useApi;
