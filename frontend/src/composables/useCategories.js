import useApi from './useApi';

// Funcion que prepara metodos especializados para manejar categorias.
const useCategories = () => {
  const api = useApi('http://localhost:3000/api');

  return {
    api,
  };
};

export default useCategories;
