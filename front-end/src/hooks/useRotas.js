import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useSessao from "./useSessao";
import { rotasPublicas } from "../constants/rotasPublicas";
import useFormularios from '../hooks/useFormularios';
import { rotasAdmin } from "../constants/rotasAdmin";
import useAdminSessao from "./useAdminSessao";
import rotasPrivadas from "../constants/rotasPrivadas";
import rotasDeGames from "../constants/rotasDeGames";

const useRotas = () => {

  const {sessao} = useSessao();
  const {role} = useAdminSessao();
  const location = useLocation();
  const {exibirFormularioLogin} = useFormularios();
  const navigate = useNavigate();

  const verificarSeRotaEPublica = () => {
    return rotasPublicas.includes(location.pathname);
  } 
  
  const verificarSeRotaEPrivada = () => {
    return rotasPrivadas.includes(location.pathname);
  } 

  const verificarSeRotaEDeGames = () => {
    return rotasDeGames.includes(location.pathname);
  } 

  const verificarSeRotaEAdministrativa = () => {
    let pathSemParametros = "/"+location.pathname.split("/")[1]+"/"+location.pathname.split("/")[2];
    return rotasAdmin.includes(pathSemParametros);
  }  

  const bloquearRotaPublica = () => {
    useEffect(() => {
      if(sessao) {
        navigate("/");
      }
    }, [sessao])
  }

  const bloquearRotaLoginAdmin = () => {
    useEffect(() => {
      if(role) {
        navigate("/adm/menuAdmin");
      }
    }, [role])
  }

  const bloquearRotaPrivada = () => {
    useEffect(() => {
      if(!sessao) {
        navigate("/");
      }
    }, [sessao])
  }

  const bloquearRotaDeGames = () => {
    useEffect(() => {
      if(!sessao) {
        navigate("/login");
      }
    }, [sessao])
  }

  const bloquearRotaAdmin = () => {
    useEffect(() => {
      if(role != "ROLE_ADMIN" && location.pathname != "/adm/login") navigate("/");
    }, [role])
  }


  return {
          verificarSeRotaEPublica, verificarSeRotaEPrivada, verificarSeRotaEDeGames, verificarSeRotaEAdministrativa,
          bloquearRotaPublica, bloquearRotaLoginAdmin, bloquearRotaPrivada, bloquearRotaDeGames, bloquearRotaAdmin
        };
}

export default useRotas;