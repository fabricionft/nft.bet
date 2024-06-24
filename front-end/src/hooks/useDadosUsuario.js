import { useEffect, useState } from "react";
import api from "../services/api";
import { useLocation, useParams } from "react-router-dom";
import useMessageBox from "./useMessageBox";
import useSessao from './useSessao';
import useLoader from "./useLoader";
import useErros from './useErros';
import UsePaginacao from './usePaginacao';

const useDadosUsuario = () => {

  //Blobal
  const {alterarVisibilidadeLoader, exibirCardLoader, esconderCardLoader} = useLoader();
  const {tratarErro} = useErros();
  const {paginacao, indicePaginacao, setQuantidadeDePaginas} = UsePaginacao();


  //Usuários (*)
  const [usuarios, setUsuarios] = useState([]);
  const location = useLocation();
  const {exibirMessageBox} = useMessageBox();

  if(location.pathname == "/adm/usuarios"){
    useEffect(() => {
      api.get("/usuarios", paginacao)
      .then((resp) => {
        setUsuarios(resp.data.content);
        alterarVisibilidadeLoader(resp.data.content);
        setQuantidadeDePaginas(resp.data.totalPages);
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }, [indicePaginacao])
  }

  //Usuário (1)
  const {identificador} = useParams();
  const {id} = useSessao();
  const [usuario, setUsuario] = useState({});

  if(location.pathname == "/conta"){
    useEffect(() => {
      api.get("/usuarios/porID/".concat(id))
      .then((resp) => {
        setUsuario((resp.data));
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }, []);
  }
  
  if(identificador && location.pathname == "/adm/usuario/".concat(identificador)){
    useEffect(() => {
      api.get("/usuarios/porID/".concat(identificador))
      .then((resp) => {
        setUsuario((resp.data));
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }, []);
  }

  const alterarStatusUsuario = (codigo) => {
    exibirCardLoader();
    api.put("/usuarios/alterarStatus/".concat(codigo))
    .then((resp) => {
      exibirMessageBox(
        "",
        "Conta "+resp.data+" com sucesso",
        true
      );
      esconderCardLoader();
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }

  const copiarIDUsuario = (codigoUsuario) => {
    exibirCardLoader();
    navigator.clipboard.writeText(codigoUsuario)
    .then(() => {
      exibirMessageBox(
        "",
        "ID do usuário copiado com sucesso!",
        true
      );
      esconderCardLoader();
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }

  const copiarCodigoDeConvite = (urlDeConvite) => {
    exibirCardLoader();
    navigator.clipboard.writeText(urlDeConvite)
    .then(() => {
      exibirMessageBox(
        "",
        "Código de convite copiado com sucesso!",
        true
      );
      esconderCardLoader();
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }

  return{usuarios, usuario, alterarStatusUsuario, copiarIDUsuario, copiarCodigoDeConvite};
}

export default useDadosUsuario;