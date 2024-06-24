import { createContext, useState } from "react";


export const FormulariosContext = createContext();

export const FormulariosProvider = ({children}) => {

  const [indice, setIndice] = useState(1);

  const avancarEtapa = () => setIndice(indice + 1)
  const voltarEtapa = () => setIndice(indice - 1);

  const [visibilidadeFormularioAlterarSenha, setVisibilidadeFormularioAlterarSenha] = useState(false);
  const [visibilidadeFormularioAdcionarChave, setVisibilidadeFormularioAdcionarChave] = useState(false);
  const [visibilidadeFormularioRejeicao, setVisibilidadeFormularioRejeicao] = useState(false);

  const exibirFormularioAlterarSenha = () => setVisibilidadeFormularioAlterarSenha(true);
  const esconderFormularioAlterarSenha = () => setVisibilidadeFormularioAlterarSenha(false);

  const exibirFormularioAdcionarChave = () => setVisibilidadeFormularioAdcionarChave(true);
  const esconderFormularioAdcionarChave = () => setVisibilidadeFormularioAdcionarChave(false);

  const exibirFormularioRejeicao = () => setVisibilidadeFormularioRejeicao(true);
  const esconderFormularioRejeicao = () => setVisibilidadeFormularioRejeicao(false);

  return(
    <FormulariosContext.Provider value={{
        indice, avancarEtapa, voltarEtapa, setIndice,
        visibilidadeFormularioAlterarSenha, exibirFormularioAlterarSenha, esconderFormularioAlterarSenha,
        visibilidadeFormularioAdcionarChave, exibirFormularioAdcionarChave, esconderFormularioAdcionarChave,
        visibilidadeFormularioRejeicao, exibirFormularioRejeicao, esconderFormularioRejeicao
    }}>
      {children}
    </FormulariosContext.Provider>
  )
}