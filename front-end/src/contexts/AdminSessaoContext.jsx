import { createContext, useEffect, useState } from "react";

export const AdminSessaoContext = createContext();

export const AdminSessaoProvider = ({children}) => {

  const [adminSessao, setAdminSessao] = useState(() => {
    const adminSessao = localStorage.getItem('adminSessao');
    return (adminSessao) ? JSON.parse(adminSessao) : false;
  });

  useEffect(() =>{
    localStorage.setItem('adminSessao', JSON.stringify(adminSessao))
  }, [adminSessao]);

  const logarComoAdmin = (adminSessao) => setAdminSessao(adminSessao);
  const deslogarComoAdmin = () => setAdminSessao(false);

  let role = adminSessao.role;
  let token = adminSessao.token;

  return(
    <AdminSessaoContext.Provider value={{adminSessao, logarComoAdmin, deslogarComoAdmin, role, token}}>
      {children}
    </AdminSessaoContext.Provider>
  )
}