import useApi from './useApi';

// Funcion que prepara metodos especializados para manejar productos.
const useProducts = () => {
  const api = useApi('http://localhost:3000/api');

  return {
    api,
  };
};

export default useProducts;
