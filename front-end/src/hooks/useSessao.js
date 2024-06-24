import { useContext } from "react";
import { SessaoContext } from "../contexts/SessaoContext";

const useSessao = () => {

  const {sessao, codigo, id, role, email, logar, deslogar} = useContext(SessaoContext);
  return{sessao, codigo, id, role, email, logar, deslogar, id}
}

export default useSessao;