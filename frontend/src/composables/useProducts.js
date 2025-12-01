import useApi from './useApi';

// Funcion que prepara metodos especializados para manejar productos.
const useProducts = () => {
  const api = useApi();

  return {
    api,
  };
};

export default useProducts;
