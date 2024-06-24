import { createContext, useState, useEffect } from "react";

export const SessaoContext = createContext();

export const SessaoProvider = ({children}) => {

  const [sessao, setSessao] = useState(() => {
    const sessao = localStorage.getItem('sessao');
    return (sessao) ? JSON.parse(sessao) : false;
  });

  useEffect(() =>{
    localStorage.setItem('sessao', JSON.stringify(sessao))
  }, [sessao]);

  let codigo = sessao.codigo;
  let email = sessao.email;
  let id = sessao.id;
  let role = sessao.role;

  const logar = (sessao) => setSessao(sessao);
  const deslogar = () => setSessao(false);

  return(
    <SessaoContext.Provider value={{sessao, codigo, id, role, email, logar, deslogar}}>
      {children}
    </SessaoContext.Provider>
  );
}