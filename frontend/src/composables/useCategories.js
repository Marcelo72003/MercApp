import useApi from './useApi';

// Funcion que prepara metodos especializados para manejar categorias.
const useCategories = () => {
  const api = useApi();

  return {
    api,
  };
};

export default useCategories;
