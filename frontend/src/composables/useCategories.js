import useApi from './useApi';

// Funcion que prepara metodos especializados para manejar categorias.
const useCategories = () => {
  // En produccion, la URL real viene desde VITE_API_URL (por ejemplo Railway).
  const api = useApi();

  return {
    api,
  };
};

export default useCategories;
