import { useContext, useEffect, useState } from "react"
import { FormulariosContext } from "../contexts/FormulariosContext";

const useFormularios = () => {

  const {indice, avancarEtapa, voltarEtapa, setIndice,
         visibilidadeFormularioAlterarSenha, exibirFormularioAlterarSenha, esconderFormularioAlterarSenha,
         visibilidadeFormularioAdcionarChave, exibirFormularioAdcionarChave, esconderFormularioAdcionarChave,
         visibilidadeFormularioRejeicao, exibirFormularioRejeicao, esconderFormularioRejeicao} = useContext(FormulariosContext);

  const [senhaVisivel, setSenhaVisivel] = useState(false);

  return {visibilidadeFormularioAlterarSenha, exibirFormularioAlterarSenha, esconderFormularioAlterarSenha,
          visibilidadeFormularioAdcionarChave, exibirFormularioAdcionarChave, esconderFormularioAdcionarChave,
          visibilidadeFormularioRejeicao, exibirFormularioRejeicao, esconderFormularioRejeicao,
          senhaVisivel, setSenhaVisivel,
          indice, avancarEtapa, voltarEtapa, setIndice};
}

export default useFormularios;