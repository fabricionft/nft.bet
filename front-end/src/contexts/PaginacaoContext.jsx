import { createContext, useState } from "react";

export const PaginacaoContext = createContext();

export const PaginacaoProvider = ({children}) => {

  const [indicePaginacao, setIndicePaginacao] = useState(0);
  const [quantidadeDePaginas, setQuantidadeDePaginas] = useState(0);

  return(
    <PaginacaoContext.Provider value={{
      indicePaginacao, setIndicePaginacao, 
      quantidadeDePaginas, setQuantidadeDePaginas
    }}>
      {children}
    </PaginacaoContext.Provider>
  )
}