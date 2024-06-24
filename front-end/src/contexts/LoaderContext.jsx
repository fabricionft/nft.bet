import { createContext, useState } from "react";

export const LoaderContext = createContext();

export const LoaderProvider = ({children}) => {

  const [visibilidadeLoader, setVisibilidadeLoader] = useState(true);

  const alterarVisibilidadeLoader = (dados) => (dados.length) ? setVisibilidadeLoader(true) : setVisibilidadeLoader(false);

  const [visibilidadeCardLoader, setVisibilidadeCardLoader] = useState(false);

  const exibirCardLoader = () => setVisibilidadeCardLoader(true);
  const esconderCardLoader = () => setVisibilidadeCardLoader(false);

  return(
    <LoaderContext.Provider value={
      {
        visibilidadeLoader, alterarVisibilidadeLoader,
        visibilidadeCardLoader, exibirCardLoader, esconderCardLoader
      }
    }>
      {children}
    </LoaderContext.Provider>
  )
}