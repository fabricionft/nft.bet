//Hooks
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMessageBox from "./useMessageBox";
import useLoader from "./useLoader";
import useErros from './useErros';
import useValidacoes from "./useValidacoes";
import usePaginacao from '../hooks/usePaginacao';

//Services
import api from "../services/api";


const useJogos = () => {

  //Global
  const {identificador} = useParams();
  const {exibirMessageBox} = useMessageBox();
  const {alterarVisibilidadeLoader, exibirCardLoader, esconderCardLoader} = useLoader();
  const {tratarErro} = useErros();
  const {validarFormularioJogo} = useValidacoes();
  const {paginacao, indicePaginacao, setQuantidadeDePaginas} = usePaginacao();
  const [filtro, setFiltro] = useState("");


  //Jogo (1)
  const [jogo, setjogo] = useState({
    tipo : "escolha"
  });

  if(identificador){
    useEffect(() => {
      api.get("/jogos/".concat(identificador))
      .then((resp) => {
        setjogo(resp.data);
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }, [identificador])
  }
  
  const preencherJogo = (e) => {
    setjogo({...jogo, [e.target.name] : e.target.value});
  }

  const salvarJogo = (e) => {
    e.preventDefault();
    exibirCardLoader();
    if(validarFormularioJogo(jogo)){
      api.post("/jogos", {...jogo})
      .then(() => {
        exibirMessageBox(
          "/adm/jogos",
          "Jogo salvo com sucesso",
          true
        );
        esconderCardLoader();
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }
  }

  const editarJogo = (e) => {
    e.preventDefault();
    exibirCardLoader();
    if(validarFormularioJogo(jogo)){
      api.post("/jogos", {...jogo})
      .then(() => {
        exibirMessageBox(
          "/adm/jogos",
          "Jogo editado com sucesso",
          true
        );
        esconderCardLoader();
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }
  }

  const excluirJogo = (codigo) => {
    exibirCardLoader();
    api.delete("/jogos/".concat(codigo))
    .then((resp) => {
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


  //Jogos (*)
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    api.get("/jogos", paginacao)
    .then((resp) => {
      setJogos((paginacao) ? resp.data.content : resp.data);
      alterarVisibilidadeLoader((paginacao) ? resp.data.content : resp.data);
      if(paginacao) setQuantidadeDePaginas(resp.data.totalPages);
    })
    .catch((error) => {
      tratarErro('', error);
    })
  }, [indicePaginacao]);

  
  return{
         jogo, preencherJogo, salvarJogo, editarJogo, excluirJogo,
         jogos, filtro, setFiltro
        };
}

export default useJogos;