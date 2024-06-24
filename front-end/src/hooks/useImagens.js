//Hooks
import { useEffect, useState } from "react";
import useErros from '../hooks/useErros';
import useMessageBox from "./useMessageBox";
import { useLocation, useParams } from "react-router-dom";
import useLoader from "./useLoader";
import useValidacoes from "./useValidacoes";

//Services
import api from "../services/api";
import UsePaginacao from "./usePaginacao";


const useImagens = () => {

  //Global
  const {tratarErro} = useErros();
  const {alterarVisibilidadeLoader, exibirCardLoader, esconderCardLoader} = useLoader();
  const {identificador} = useParams();
  const paginaAtual = useLocation().pathname;
  const {exibirMessageBox} = useMessageBox();
  const {validarFormularioImagem} = useValidacoes();
  const {paginacao, indicePaginacao, setQuantidadeDePaginas} = UsePaginacao();


  //Imagem (1)
  const [imagem, setImagem] = useState({});

  const preencherImagem = (e) => setImagem({...imagem, [e.target.name] : e.target.value});

  const salvarImagem = (e) => {
    e.preventDefault();

    if(validarFormularioImagem(imagem)){
      exibirCardLoader();
      api.post("/imagens", {...imagem})
      .then(() => {
        exibirMessageBox(
          "/adm/imagens",
          "Imagem salva com sucesso",
          true
        );
        esconderCardLoader();
      })
      .catch((error) => {
        tratarErro('', error);
      });
    }
  }

  if(identificador){
    useEffect(() => {
      api.get("/imagens/"+identificador)
      .then((resp) => {
        setImagem(resp.data);
      })
      .catch((error) => {
        tratarErro('', error)
      });
    }, [identificador])
  }

  const excluirImagem = (codigo) => {
    exibirCardLoader();
    api.delete("/imagens/"+codigo)
    .then(() => {
      exibirMessageBox(
        "",
        "Imagem excluída com sucesso",
        true
      );
      esconderCardLoader();
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }


  //Imagens (*)
  const [imagens, setImagens] = useState([]);

  useEffect(() => {
    api.get("/imagens", paginacao)
    .then((resp) => {
      setImagens((paginacao) ? resp.data.content : resp.data);
      alterarVisibilidadeLoader((paginacao) ? resp.data.content : resp.data);
      if(paginacao) setQuantidadeDePaginas(resp.data.totalPages);
    })
    .catch((error) => {
      tratarErro('', error);
    });
  }, [indicePaginacao]);

  const [sliderPerVIew, setSlidesPerView] = useState(2);

  if(paginaAtual == "/"){
    useEffect(() => {
      function redimencionar(){
        if(window.innerWidth < 550) setSlidesPerView(1);
        else setSlidesPerView(2);
      }
  
      redimencionar();
  
      window.addEventListener('resize', redimencionar);
  
      return() => {
        window.removeEventListener('resize', redimencionar);
      }
    }, []);
  }
  

  return{
    imagens, sliderPerVIew,
    imagem, preencherImagem, salvarImagem, excluirImagem
  }
}

export default useImagens;