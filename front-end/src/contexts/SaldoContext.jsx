import { createContext, useState } from "react";

export const SaldoContext = createContext();

export const SaldoProvider = ({children}) => {

  const [saldo, setSaldo] = useState(0);

  const atualizarSaldo = (novoSaldo) => setSaldo(novoSaldo);

  return(
    <SaldoContext.Provider value={{saldo, atualizarSaldo}}>
      {children}
    </SaldoContext.Provider>
  )
}