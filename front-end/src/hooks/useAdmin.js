import { useState } from "react";
import api from "../services/api";
import useMessageBox from "./useMessageBox";
import useAdminSessao from "./useAdminSessao";
import useErros from './useErros';
import useLoader from "./useLoader";

const useAdmin = () => {

  const [admin, setAdmin] = useState({});
  const [visibilidadeSenha, setVisibilidadeSenha] = useState(false);
  const [visibilidadeSenhaSistema, setVisibilidadeSenhaSistema] = useState(false);
  const {exibirMessageBox} = useMessageBox();
  const {logarComoAdmin} = useAdminSessao();
  const {tratarErro} = useErros();
  const {exibirCardLoader, esconderCardLoader} = useLoader();

  
  const preencherAdmin = (e) => {
    setAdmin({...admin, [e.target.name] : e.target.value});
  }

  const enviarFormularioLoginAdmin = (e) => {
    e.preventDefault();
    fazerLoginComoAdmin();
  }

  const fazerLoginComoAdmin = () => {
    exibirCardLoader();
    api.post("/usuarios/loginAdmin", {
      email: admin.email.trim(),
      senha: admin.senha.trim(),
      senhaSistema: admin.senhaSistema.trim()
    })
    .then((resp) => {
      logarComoAdmin(resp.data);
      exibirMessageBox(
        "/adm/menuAdmin",
        "Logado como ADMIn com sucesso!",
        true
      );
      esconderCardLoader();
    })
    .catch((error) => {
      tratarErro("", error);
    })
  }

  return {visibilidadeSenha, setVisibilidadeSenha, visibilidadeSenhaSistema, setVisibilidadeSenhaSistema,
          admin, preencherAdmin, enviarFormularioLoginAdmin};
}

export default useAdmin;