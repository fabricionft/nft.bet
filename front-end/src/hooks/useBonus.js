//Hooks
import { useEffect, useState } from "react";
import useMessageBox from "./useMessageBox";
import { useLocation, useParams } from "react-router-dom";
import useLoader from "./useLoader";
import useErros from './useErros';

//Services
import api from '../services/api';
import useValidacoes from "./useValidacoes";
import UsePaginacao from "./usePaginacao";


const useBonus = () => {

  //Global
  const {identificador} = useParams();
  const paginaAtual = useLocation().pathname;
  const {exibirMessageBox} = useMessageBox();
  const {alterarVisibilidadeLoader, exibirCardLoader, esconderCardLoader} = useLoader();
  const {tratarErro} = useErros();
  const {validarFormularioBonus} = useValidacoes();
  const {paginacao, indicePaginacao, setQuantidadeDePaginas} = UsePaginacao();


  //Bonus (1)
  const [bonus, setBonus] = useState({
    tipo: "escolha",
    valorBonus: 0,
    percentualBonus: 0
  });

  const preencherBonus =  (e) => {
    setBonus({...bonus, [e.target.name] : e.target.value})
  }

  const salvarBonus = (e) => {
    e.preventDefault();

    if(validarFormularioBonus(bonus)){
      exibirCardLoader();
      api.post("/bonus", {
        ...bonus
      })
      .then(() => {
        exibirMessageBox(
          "/adm/bonus",
          "Bonus salvo com sucesso",
          true
        );
        esconderCardLoader();
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }
  }

  const editarBonus = (e) => {
    e.preventDefault();
    exibirCardLoader();
    api.put("/bonus", {
      ...bonus
    })
    .then(() => {
      exibirMessageBox(
        "/adm/bonus",
        "Bonus editado com sucesso",
        true
      );
      esconderCardLoader();
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }

  const excluirBonus = (codigo) => {
    exibirCardLoader();
    api.delete("/bonus/".concat(codigo))
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

  if(identificador){
    useEffect(() => {
      api.get("/bonus/".concat(identificador))
      .then((resp) => {
        resp.data.dataValidade = resp.data.dataValidade.split("T")[0];
        setBonus(resp.data);
      })
      .catch((error) => console.log(error));
    }, [identificador]);
  }


  //Lista de bônus (*)
  const [listaBonus, setListaBonus] = useState([]);

  if(["/bonus", "/adm/bonus"].includes(paginaAtual)){
    useEffect(() => {
      api.get("/bonus", paginacao)
      .then((resp) => {
        setListaBonus((paginacao) ? resp.data.content : resp.data);
        alterarVisibilidadeLoader((paginacao) ? resp.data.content : resp.data);
        if(paginacao) setQuantidadeDePaginas(resp.data.totalPages);
      })
      .catch((error) => {
        tratarErro('', error);
      })
    }, [indicePaginacao]);
  }

  const copiarCodigoBonus = (codigoBonus) => {
    navigator.clipboard.writeText(codigoBonus)
    .then(() => {
      exibirMessageBox(
        "",
        "Código bônus copiado com sucesso!",
        true
      );
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }


  return{
         preencherBonus,bonus, salvarBonus, editarBonus, excluirBonus,
         listaBonus, copiarCodigoBonus
        }
}

export default useBonus;