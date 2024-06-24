import { useState } from "react"
import api from '../services/api';
import useSessao from "./useSessao";
import useFormularios from "./useFormularios";
import useMessageBox from "./useMessageBox";
import useValidacoes from "./useValidacoes";
import useErros from "./useErros";
import useLoader from "./useLoader";

const useUsuario = () => {

  const {logar, email} = useSessao();
  const {esconderFormularioAlterarSenha, avancarEtapa} = useFormularios();
  const {exibirMessageBox} = useMessageBox();
  const {validarFormularioRecuperarSenha, validarFormularioAlterarSenha} = useValidacoes();
  const {tratarErro} = useErros();
  const {exibirCardLoader, esconderCardLoader} = useLoader();

  const [usuario, setUSuario] = useState({});

  const solicitarCodigoDeConfirmacao = (recuperar) => {
    exibirCardLoader();
    api.post("/usuarios/solicitarCodigo?email="+usuario.email.trim()+"&recuperar="+recuperar)
    .then(() => {
      exibirMessageBox(
        "",
        "O código de confirmação foi enviado com, sucesso para seu email!",
        true
      );
      esconderCardLoader();
      avancarEtapa();
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }

  const fazerCadastro = () => {
    exibirCardLoader();
    api.post("/usuarios", {
      ...usuario,
      email: usuario.email.trim(),
      senha: usuario.senha.trim(),
      codigoBonus: (usuario.codigoBonus) ? usuario.codigoBonus : 0,
      convite: (usuario.codigoConvite) ? usuario.codigoConvite : 0
    })
    .then(() => {
      fazerLogin(true);
      esconderCardLoader();
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }

  const fazerLogin = (loginAposCadastro) => {
    let mensagem = (loginAposCadastro) ? "Conta criada com sucesso, você já foi automaticamente logado!" : "Logado com sucesso";

    exibirCardLoader();
    api.post("/usuarios/login", {
      email: usuario.email.trim(),
      senha: usuario.senha.trim()
    })
    .then((resp) => {
      logar(resp.data);
      exibirMessageBox(
        "/",
        mensagem,
        true
      );
      esconderCardLoader();
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }

  const recuperarSenha = () => {
    if(validarFormularioRecuperarSenha(usuario)){
      exibirCardLoader();
      api.put("/usuarios/recuperarSenha", {
        email: usuario.email.trim(),
        ...usuario
      })
      .then((resp) => {
        esconderFormularioAlterarSenha();
        exibirMessageBox(
          "/login",
          resp.data,
          true
        );
        esconderCardLoader();
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }
  }

  const alterarSenha = () => {
    if(validarFormularioAlterarSenha(usuario)){
      exibirCardLoader();
      api.put("/usuarios/alterarSenha", {
        email: email.trim(),
        ...usuario
      })
      .then((resp) => {
        esconderFormularioAlterarSenha();
        exibirMessageBox(
          "",
          resp.data,
          true
        );
        esconderCardLoader();
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }
  }

  const preencherUsuario = (e) => {
    setUSuario({...usuario, [e.target.name] : e.target.value});
  }

  const enviarFormularioCadastro = (e) => {
    e.preventDefault();
    fazerCadastro();
  }

  const enviarFormularioLogin = (e) => {
    e.preventDefault();
    fazerLogin();
  }

  const enviarFormularioRecuperarSenha = (e) => {
    e.preventDefault();
    recuperarSenha()
  }

  const enviarFormularioAlterarSenha = (e) => {
    e.preventDefault();
    alterarSenha();
  }

  return{
    usuario, setUSuario, preencherUsuario,
    enviarFormularioCadastro, enviarFormularioLogin, enviarFormularioRecuperarSenha, enviarFormularioAlterarSenha,
    solicitarCodigoDeConfirmacao
  }
}

export default useUsuario