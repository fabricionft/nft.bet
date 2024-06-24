import { useContext } from "react";
import { LoaderContext } from "../contexts/LoaderContext";


const useLoader = () => {

  const {visibilidadeLoader, alterarVisibilidadeLoader, visibilidadeCardLoader, exibirCardLoader, esconderCardLoader} = useContext(LoaderContext)
  return {visibilidadeLoader, alterarVisibilidadeLoader, visibilidadeCardLoader, exibirCardLoader, esconderCardLoader};
}

export default useLoader;