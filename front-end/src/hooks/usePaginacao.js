import { useContext, useEffect } from "react";
import { PaginacaoContext } from "../contexts/PaginacaoContext";
import rotasAdmin from '../constants/rotasAdmin.js';
import { useLocation } from "react-router-dom";


const UsePaginacao = () => {

  const {indicePaginacao, setIndicePaginacao, quantidadeDePaginas, setQuantidadeDePaginas} = useContext(PaginacaoContext);
  const paginaAtual = useLocation().pathname;

  useEffect(() => {
    if(indicePaginacao + 1 > quantidadeDePaginas) setIndicePaginacao(0);
  }, [quantidadeDePaginas]);

  const paginacao = (rotasAdmin.includes(paginaAtual)) ? {
    params: {
      size: 15,
      page: indicePaginacao
    }
  } : null;
  //Não mudar o size para 20, caso o contrário o back-end vai reconhecer como um pageable padrão/isento, e não irá paginar a lista.
  
  return{paginacao, indicePaginacao, setIndicePaginacao, quantidadeDePaginas, setQuantidadeDePaginas};
}

export default UsePaginacao;