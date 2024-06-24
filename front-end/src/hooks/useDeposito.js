import { useEffect, useState } from "react";
import api from "../services/api";
import useSessao from "./useSessao";
import useMessageBox from "./useMessageBox";
import { useLocation, useParams } from "react-router-dom";
import useLoader from "./useLoader";
import useFormularios from "./useFormularios";
import useErros from './useErros';
import UsePaginacao from "./usePaginacao";

const useDeposito = () => {

  //Global
  const location = useLocation();
  const {identificador} = useParams();
  const {alterarVisibilidadeLoader, exibirCardLoader, esconderCardLoader} = useLoader();
  const {esconderFormularioRejeicao} = useFormularios();
  const {tratarErro} = useErros();
  const {paginacao, indicePaginacao, setQuantidadeDePaginas} = UsePaginacao();

  //Depósitos (*)
  const [depositos, setDepositos] = useState([]);
  const [status, setStatus] = useState("solicitado");

  if(location.pathname == "/adm/depositos"){
    useEffect(() => {
      api.get("/depositos/status/".concat(status), paginacao)
      .then((resp) => {
        setDepositos(resp.data.content);
        alterarVisibilidadeLoader(resp.data.content);
        setQuantidadeDePaginas(resp.data.totalPages)
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }, [status, indicePaginacao]);
  }

  //Depósito (1)
  const [deposito, setDeposito] = useState({
    codigoBonus : ""
  });
  const {codigo} = useSessao();
  const {exibirMessageBox} = useMessageBox();

  const escolherValor = (e) => setDeposito({...deposito, "valorDeposito" : e.target.id});

  const preencherDeposito = (e) => setDeposito({...deposito, [e.target.name] : e.target.value});

  const solicitarDeposito = () => {
    if(deposito.valorDeposito){
      exibirCardLoader();
      api.post("/depositos", {
        codigoUsuario: codigo,
        valorDeposito: deposito.valorDeposito,
        codigoBonus: deposito.codigoBonus.length == 4 ? deposito.codigoBonus : 0
      })
      .then(() => {
        setDeposito({...deposito, valorDeposito: "", codigoBonus: ""})
        exibirMessageBox(
          "",
          "Solicitação de depósito concluída com sucesso!",
          true
        );
        esconderCardLoader();
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }else{
      exibirMessageBox(
        "",
        "Preencha todos os campos obrigatórios deste formulário!",
        false
      )
    }
  }

  const autorizarDeposito = () => {
    exibirCardLoader();
    api.post("/depositos/autorizar", {...detalhesDeposito})
    .then((resp) => {
      setDetalhesDeposito(resp.data);
      exibirMessageBox(
        "",
        "Depósito autorizado com sucesso!",
        true
      );
      esconderCardLoader();
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }

  const recusarDeposito = (e) => {
    e.preventDefault();
    exibirCardLoader();
    api.post("/depositos/recusar", {
      ...detalhesDeposito,
      motivoRejeicao: detalhesDeposito.motivoRejeicao
    })
    .then((resp) => {
      esconderFormularioRejeicao();
      setDetalhesDeposito(resp.data);
      exibirMessageBox(
        "",
        "Depósito recusado com sucesso!",
        true
      );
      esconderCardLoader();
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }
  

  //Detalhes depósito (1)
  const [detalhesDeposito, setDetalhesDeposito] = useState({});

  if(identificador && location.pathname == "/adm/deposito/".concat(identificador)) {
    useEffect(() => {
      buscarDeposito(identificador);
    }, [identificador])
  }

  const buscarDeposito = (codigoDeposito) => {
    exibirCardLoader();
    api.get("/depositos/".concat(codigoDeposito))
    .then((resp) => {
      setDetalhesDeposito(resp.data);
      esconderCardLoader();
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }

  const removerDetalhesDeposito = () => setDetalhesDeposito({});

  const preencherDetalhesDeposito = (e) => setDetalhesDeposito({...detalhesDeposito, [e.target.name] : e.target.value});

  return{depositos, setStatus,
         deposito, escolherValor, preencherDeposito, solicitarDeposito, autorizarDeposito, recusarDeposito,
         buscarDeposito, detalhesDeposito, removerDetalhesDeposito, preencherDetalhesDeposito};
}

export default useDeposito;