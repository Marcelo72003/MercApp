import useApi from './useApi';

// Funcion que prepara metodos especializados para manejar productos.
const useProducts = () => {
  // En produccion, la URL real viene desde VITE_API_URL (por ejemplo Railway).
  const api = useApi();

  return {
    api,
  };
};

export default useProducts;
